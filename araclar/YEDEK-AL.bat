@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Rehberim - Veritabani Yedegi

echo.
echo ============================================================
echo   REHBERIM - VERITABANI YEDEGI
echo ============================================================
echo.
echo  Supabase'in UCRETSIZ planinda otomatik yedek YOKTUR.
echo  (Otomatik gunluk yedek yalniz Pro ve ustu planlarda var.)
echo  Veritabani silinirse ya da bozulursa geri donusu yok --
echo  bu dosya o yuzden var.
echo.
echo  Yedek SENIN bilgisayarina iner. Ogrenci verisi GitHub'a
echo  KONULMAZ; depo herkese acik.
echo.

set DEPO=%USERPROFILE%\LGS-Destek
if not exist "%DEPO%\tools\yedek-al.mjs" (
  echo HATA: Depo bulunamadi: %DEPO%
  echo Once paketleri calistirip depoyu guncellemis olmalisin.
  echo.
  pause
  exit /b 1
)
cd /d "%DEPO%"

if not exist "node_modules\@supabase\supabase-js" (
  echo Gerekli paketler kuruluyor, bu biraz surebilir...
  call npm install
  set HATA=!errorlevel!
  if not "!HATA!"=="0" (
    echo HATA: Paketler kurulamadi.
    pause
    exit /b 1
  )
)

echo ============================================================
echo   ANAHTAR NASIL ALINIR
echo ============================================================
echo.
echo  1. supabase.com/dashboard adresine gir
echo  2. Projeyi ac
echo  3. Sol altta Project Settings ^> API Keys
echo  4. "service_role" ^(secret^) anahtarini kopyala
echo.
echo  NOT: Bu anahtar veritabaninin tamamini acar. Kimseyle
echo  paylasma, bana da gonderme.
echo.

set "ANAHTAR="
set /p ANAHTAR=service_role anahtarini yapistir (Enter): 
if "%ANAHTAR%"=="" (
  echo.
  echo Anahtar girilmedi. Yedek alinmadi.
  pause
  exit /b 1
)

set "ADRES="
set /p ADRES=Proje adresi (bos birak = https://olvlrgduwpmxrfwiijsm.supabase.co): 
if "%ADRES%"=="" set ADRES=https://olvlrgduwpmxrfwiijsm.supabase.co

for /f "tokens=1-3 delims=/." %%a in ("%DATE%") do set BUGUN=%%c-%%b-%%a
set HEDEF=%USERPROFILE%\Downloads\rehberim-yedek-%BUGUN%

echo.
echo Yedek aliniyor...
echo Klasor: %HEDEF%
echo.

set NEXT_PUBLIC_SUPABASE_URL=%ADRES%
set SUPABASE_SERVICE_ROLE_KEY=%ANAHTAR%
call node tools\yedek-al.mjs "%HEDEF%"
set HATA=%errorlevel%

set NEXT_PUBLIC_SUPABASE_URL=
set SUPABASE_SERVICE_ROLE_KEY=

echo.
if not "%HATA%"=="0" (
  echo ============================================================
  echo   DIKKAT: Yedek eksik alindi.
  echo   BU YEDEGE GUVENME. Bana yukaridaki yaziyi gonder.
  echo ============================================================
  echo.
  pause
  exit /b 1
)

echo ============================================================
echo   YEDEK TAMAM
echo ============================================================
echo.
echo  Klasor: %HEDEF%
echo.
echo  BUNU YAP: klasoru bilgisayarindan BASKA bir yere de kopyala
echo  (harici disk, USB bellek ya da kendi bulutun). Yalniz bu
echo  bilgisayarda duran yedek, bilgisayar bozulunca yedek sayilmaz.
echo.
echo  Icindeki dosyalar ogrenci verisi icerir:
echo   - kimseyle paylasma
echo   - GitHub'a yukleme
echo   - e-postayla gonderme
echo.
echo  Ayda bir yeterli. Buyuk bir degisiklikten once de al.
echo.
pause
