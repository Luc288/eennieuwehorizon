@echo off
REM ============================================================
REM  publish.bat - Een Nieuwe Horizon publiceren naar Netlify
REM  Bouwt de site ter controle en pusht daarna naar GitHub.
REM  Netlify deployt automatisch na de push.
REM ============================================================

setlocal
cd /d "%~dp0"

echo.
echo === 1/4  Site bouwen ter controle (hugo --minify) ===
call hugo --minify
if errorlevel 1 (
  echo.
  echo *** FOUT: de build is mislukt. Er wordt NIET gepusht. ***
  echo Los de fout hierboven op en probeer opnieuw.
  pause
  exit /b 1
)

echo.
echo === 2/4  Wijzigingen klaarzetten (git add) ===
git add -A

REM --- Niets gewijzigd? Dan stoppen ---
git diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo Geen wijzigingen om te publiceren. Klaar.
  pause
  exit /b 0
)

echo.
echo === 3/4  Commit ===
REM Commitboodschap: argument gebruiken, anders vragen
set "MSG=%*"
if "%MSG%"=="" set /p "MSG=Korte omschrijving van de wijziging: "
if "%MSG%"=="" set "MSG=Site bijwerken"
git commit -m "%MSG%"

echo.
echo === 4/4  Pushen naar GitHub (Netlify deployt automatisch) ===
git push
if errorlevel 1 (
  echo.
  echo *** FOUT bij het pushen. Controleer je internet/GitHub-login. ***
  pause
  exit /b 1
)

echo.
echo === KLAAR ===
echo De wijziging is gepusht. Netlify bouwt nu automatisch (~1 min).
echo Volg de voortgang in Netlify onder "Deploys".
echo.
pause
endlocal
