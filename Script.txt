
@echo off
setlocal EnableExtensions

:: ==========================================
:: MADHU VISION - DESKTOP APPLICATION
:: ==========================================

set "PROJECT=F:\Madhu\Aeh\madhu-vision"
set "URL=http://127.0.0.1:5173"
set "PROFILE=%LOCALAPPDATA%\MadhuVision\ChromeProfile"

:: Check project folder
if not exist "%PROJECT%\package.json" (
    powershell -NoProfile -Command "[System.Windows.Forms.MessageBox]::Show('Project folder not found!','MADHU VISION')"
    exit /b 1
)

:: Check whether port 5173 is already occupied
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue) { exit 1 } else { exit 0 }"
if errorlevel 1 (
    powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Port 5173 is already occupied. Close the previous application before restarting.','MADHU VISION')"
    exit /b 1
)

:: Find Chrome
set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"

if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"

if not exist "%CHROME%" (
    echo Google Chrome not found.
    exit /b 1
)

:: Start React server in background
for /f %%P in ('powershell -NoProfile -Command "$p=Start-Process -FilePath $env:ComSpec -ArgumentList '/c npm run dev -- --host 127.0.0.1 --port 5173 --strictPort' -WorkingDirectory '%PROJECT%' -WindowStyle Hidden -PassThru; $p.Id"') do set "SERVERPID=%%P"

if not defined SERVERPID exit /b 1

:: Wait for React server
set /a COUNT=0

:WAIT
powershell -NoProfile -Command "try { $r=Invoke-WebRequest '%URL%' -UseBasicParsing -TimeoutSec 2; if($r.StatusCode -eq 200){exit 0}else{exit 1} } catch { exit 1 }" >nul 2>&1

if not errorlevel 1 goto LAUNCH

set /a COUNT+=1
if %COUNT% GEQ 60 goto ERROR

timeout /t 1 /nobreak >nul
goto WAIT

:LAUNCH

:: Create isolated Chrome profile
if not exist "%PROFILE%" mkdir "%PROFILE%"

:: Open application in full-screen kiosk mode
start "" /wait "%CHROME%" --kiosk --app="%URL%" --user-data-dir="%PROFILE%" --no-first-run --disable-background-mode

:: Chrome closed - stop React server and its child processes
taskkill /PID %SERVERPID% /T /F >nul 2>&1

exit /b 0

:ERROR

:: Startup failed - clean up server
taskkill /PID %SERVERPID% /T /F >nul 2>&1

powershell -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('React server failed to start. Check the project and npm configuration.','MADHU VISION')"

exit /b 1
