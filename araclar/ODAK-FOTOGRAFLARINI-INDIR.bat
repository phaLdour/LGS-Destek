@echo off
chcp 65001 >nul
title Rehberim - Odak Fotograflarini Indir
echo.
echo ============================================================
echo   ODAK MODU FOTOGRAFLARINI KENDI SUNUCUMUZA AL
echo ============================================================
echo.
echo  Su an Odak Modu'nun 8 tema fotografi Unsplash'ten cekiliyor.
echo  Yani her ogrencinin tarayicisi unsplash.com'a istek atiyor;
echo  IP adresi ve hangi sayfadan geldigi ucuncu bir tarafa gidiyor.
echo  Kullanicilari cocuk olan bir sitede bunu surdurmek dogru degil.
echo.
echo  Bu dosya fotograflari bir kez indirir, public\odak\ altina
echo  koyar ve GitHub'a gonderir. Sonrasinda site Unsplash'e hic
echo  dokunmaz; fotograflar cevrimdisi da gelir.
echo.
echo  Indirilecek: 8 fotograf, toplam yaklasik 2-3 MB.
echo.
pause

set "DEPO="
if exist "%USERPROFILE%\Desktop\LGS-Destek\.git" set "DEPO=%USERPROFILE%\Desktop\LGS-Destek"
if not defined DEPO if exist "%USERPROFILE%\LGS-Destek\.git" set "DEPO=%USERPROFILE%\LGS-Destek"
if not defined DEPO if exist "%USERPROFILE%\Documents\LGS-Destek\.git" set "DEPO=%USERPROFILE%\Documents\LGS-Destek"
if not defined DEPO if exist "C:\LGS-Destek\.git" set "DEPO=C:\LGS-Destek"

if not defined DEPO (
  echo HATA: LGS-Destek klasoru bulunamadi.
  echo.
  pause
  exit /b 1
)

cd /d "%DEPO%"
echo.
echo Depo: %DEPO%
echo.

echo [1/4] Son surum aliniyor...
git checkout main
git pull origin main
set HATA=%errorlevel%
if not "%HATA%"=="0" (
  echo HATA: guncelleme alinamadi.
  pause
  exit /b 1
)

echo.
echo [2/4] Fotograflar indiriliyor...
call node tools\odak-fotograflarini-indir.mjs
set HATA=%errorlevel%
if not "%HATA%"=="0" (
  echo.
  echo HATA: Fotograflar indirilemedi. Internet baglantini kontrol et.
  echo Hicbir sey degistirilmedi.
  pause
  exit /b 1
)

echo.
echo [3/4] Depoya ekleniyor...
git add public/odak
git -c user.email=noreply@anthropic.com -c user.name=Claude commit -m "Odak tema fotograflari artik kendi sunucumuzda (oneri 10)"
set HATA=%errorlevel%
if not "%HATA%"=="0" (
  echo.
  echo Eklenecek yeni dosya yok gibi gorunuyor - fotograflar zaten
  echo depoda olabilir. Sorun degil.
  echo.
  pause
  exit /b 0
)

echo.
echo [4/4] GitHub'a gonderiliyor...
git push origin main
set HATA=%errorlevel%
if not "%HATA%"=="0" (
  echo HATA: Gonderilemedi.
  pause
  exit /b 1
)

echo.
echo ============================================================
echo   TAMAM
echo ============================================================
echo.
echo  Fotograflar artik kendi sunucumuzda.
echo  Site bundan sonra Unsplash'e hic istek atmayacak.
echo.
pause
