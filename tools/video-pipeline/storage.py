"""Video/kapak dosyalarını herkese açık bir depoya yükleyen arka uçlar.

Seçim `STORAGE_BACKEND` ortam değişkeniyle yapılır:

  s3        S3 uyumlu depo (Cloudflare R2, Bunny, AWS S3, MinIO...).
            S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY,
            S3_REGION (R2 için "auto"), PUBLIC_BASE_URL (ör. https://videolar.example.com
            veya https://pub-xxxx.r2.dev) ve isteğe bağlı S3_PREFIX.
  supabase  Supabase Storage (mevcut proje). SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
            SUPABASE_BUCKET (varsayılan: videolar). Bucket yoksa public olarak oluşturulur.
  local     Depoya yüklemez; dosyaları repo içindeki public/videos altına kopyalar
            (yalnızca deneme/yerel geliştirme için; üretimde önerilmez).

Her arka uç `upload(local_path, key, content_type) -> public_url` sunar.
"""

from __future__ import annotations

import mimetypes
import os
import shutil
from pathlib import Path
from urllib.parse import quote


class StorageError(RuntimeError):
    pass


def _env(name: str, default: str | None = None, *, required: bool = False) -> str:
    val = os.environ.get(name, default)
    if required and not val:
        raise StorageError(f"{name} ortam değişkeni tanımlı değil (config.env).")
    return val or ""


def guess_type(path: Path) -> str:
    ct, _ = mimetypes.guess_type(str(path))
    if path.suffix.lower() == ".webp":
        return "image/webp"
    if path.suffix.lower() == ".mp4":
        return "video/mp4"
    return ct or "application/octet-stream"


class Backend:
    name = "base"

    def upload(self, local_path: Path, key: str, content_type: str | None = None) -> str:
        raise NotImplementedError

    def public_url(self, key: str) -> str:
        raise NotImplementedError

    def describe(self) -> str:
        return self.name


class LocalBackend(Backend):
    name = "local"

    def __init__(self, repo_dir: Path):
        self.root = repo_dir / "public" / "videos"

    def upload(self, local_path: Path, key: str, content_type: str | None = None) -> str:
        dst = self.root / key
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(local_path, dst)
        return self.public_url(key)

    def public_url(self, key: str) -> str:
        return "/videos/" + "/".join(quote(p) for p in key.split("/"))

    def describe(self) -> str:
        return f"local → {self.root}"


class S3Backend(Backend):
    name = "s3"

    def __init__(self) -> None:
        try:
            import boto3  # noqa: F401
            from botocore.config import Config  # noqa: F401
        except ImportError as e:  # pragma: no cover
            raise StorageError("boto3 kurulu değil: pip install boto3") from e
        import boto3
        from botocore.config import Config

        self.bucket = _env("S3_BUCKET", required=True)
        self.prefix = _env("S3_PREFIX", "").strip("/")
        self.base_url = _env("PUBLIC_BASE_URL", required=True).rstrip("/")
        endpoint = _env("S3_ENDPOINT") or None
        region = _env("S3_REGION", "auto")
        self.client = boto3.client(
            "s3",
            endpoint_url=endpoint,
            region_name=region,
            aws_access_key_id=_env("S3_ACCESS_KEY_ID", required=True),
            aws_secret_access_key=_env("S3_SECRET_ACCESS_KEY", required=True),
            config=Config(signature_version="s3v4", s3={"addressing_style": "path"}),
        )

    def _key(self, key: str) -> str:
        return f"{self.prefix}/{key}" if self.prefix else key

    def upload(self, local_path: Path, key: str, content_type: str | None = None) -> str:
        ct = content_type or guess_type(local_path)
        extra = {
            "ContentType": ct,
            # Videolar değişmez (yeni üretim yeni anahtar alır) → uzun önbellek.
            "CacheControl": "public, max-age=31536000, immutable",
        }
        self.client.upload_file(str(local_path), self.bucket, self._key(key), ExtraArgs=extra)
        return self.public_url(key)

    def public_url(self, key: str) -> str:
        return f"{self.base_url}/" + "/".join(quote(p) for p in self._key(key).split("/"))

    def describe(self) -> str:
        return f"s3 → bucket {self.bucket} ({self.base_url})"


class SupabaseBackend(Backend):
    name = "supabase"

    def __init__(self) -> None:
        import httpx

        self.url = _env("SUPABASE_URL", required=True).rstrip("/")
        self.key = _env("SUPABASE_SERVICE_ROLE_KEY", required=True)
        self.bucket = _env("SUPABASE_BUCKET", "videolar")
        self.http = httpx.Client(
            base_url=f"{self.url}/storage/v1",
            headers={"Authorization": f"Bearer {self.key}", "apikey": self.key},
            timeout=httpx.Timeout(60.0, read=600.0, write=600.0),
        )
        self.ensure_bucket()

    def ensure_bucket(self) -> None:
        r = self.http.get(f"/bucket/{self.bucket}")
        if r.status_code == 200:
            if not r.json().get("public", False):
                self.http.put(f"/bucket/{self.bucket}", json={"public": True}).raise_for_status()
            return
        r = self.http.post(
            "/bucket",
            json={"id": self.bucket, "name": self.bucket, "public": True},
        )
        if r.status_code not in (200, 201):
            raise StorageError(f"Supabase bucket oluşturulamadı: {r.status_code} {r.text[:300]}")

    def upload(self, local_path: Path, key: str, content_type: str | None = None) -> str:
        ct = content_type or guess_type(local_path)
        with open(local_path, "rb") as fh:
            r = self.http.post(
                f"/object/{self.bucket}/{key}",
                content=fh.read(),
                headers={
                    "Content-Type": ct,
                    "x-upsert": "true",
                    "cache-control": "31536000",
                },
            )
        if r.status_code not in (200, 201):
            raise StorageError(f"Supabase yükleme hatası ({key}): {r.status_code} {r.text[:300]}")
        return self.public_url(key)

    def public_url(self, key: str) -> str:
        return f"{self.url}/storage/v1/object/public/{self.bucket}/" + "/".join(
            quote(p) for p in key.split("/")
        )

    def describe(self) -> str:
        return f"supabase → {self.url} / {self.bucket}"


def get_backend(repo_dir: Path) -> Backend:
    kind = _env("STORAGE_BACKEND", "").strip().lower()
    if kind in ("s3", "r2", "bunny", "minio"):
        return S3Backend()
    if kind == "supabase":
        return SupabaseBackend()
    if kind == "local":
        return LocalBackend(repo_dir)
    raise StorageError(
        "STORAGE_BACKEND tanımlı değil. Seçenekler: s3 (R2/Bunny/AWS), supabase, local."
    )
