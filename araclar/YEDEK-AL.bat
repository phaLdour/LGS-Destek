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

set "DEPO="
if exist "%USERPROFILE%\Desktop\LGS-Destek\.git" set "DEPO=%USERPROFILE%\Desktop\LGS-Destek"
if not defined DEPO if exist "%USERPROFILE%\LGS-Destek\.git" set "DEPO=%USERPROFILE%\LGS-Destek"
if not defined DEPO if exist "%USERPROFILE%\Documents\LGS-Destek\.git" set "DEPO=%USERPROFILE%\Documents\LGS-Destek"
if not defined DEPO if exist "C:\LGS-Destek\.git" set "DEPO=C:\LGS-Destek"

if not defined DEPO (
  echo HATA: LGS-Destek klasoru bulunamadi.
  echo Su yerlere baktim:
  echo   %USERPROFILE%\Desktop\LGS-Destek
  echo   %USERPROFILE%\LGS-Destek
  echo   %USERPROFILE%\Documents\LGS-Destek
  echo   C:\LGS-Destek
  echo Klasor baska bir yerdeyse bana soyle.
  echo.
  pause
  exit /b 1
)

if not exist "%DEPO%\tools\yedek-al.mjs" (
  echo HATA: Depo bulundu ama guncel degil: %DEPO%
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

echo Depo: %DEPO%
echo.
echo  Anahtar depodaki .env.local dosyasindan okunur.
echo  Orada yoksa asagiya elle yapistirabilirsin (bos birakip
echo  Enter'a basarsan dosyadan okumayi dener).
echo.
echo  Anahtari almak icin: supabase.com/dashboard ^> proje ^>
echo  Project Settings ^> API Keys ^> service_role (secret)
echo.
echo  NOT: Bu anahtar veritabaninin tamamini acar. Kimseyle
echo  paylasma, bana da gonderme.
echo.

set "ANAHTAR="
set /p ANAHTAR=service_role anahtari (bos = .env.local'dan oku): 
if not "%ANAHTAR%"=="" set SUPABASE_SERVICE_ROLE_KEY=%ANAHTAR%

for /f "tokens=1-3 delims=/." %%a in ("%DATE%") do set BUGUN=%%c-%%b-%%a
set HEDEF=%USERPROFILE%\Downloads\rehberim-yedek-%BUGUN%

echo.
echo Yedek aliniyor...
echo Klasor: %HEDEF%
echo.

call node tools\yedek-al.mjs "%HEDEF%"
set HATA=%errorlevel%

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
