@echo off
echo ==========================================
echo       Starting IntelliBot PRO Stack
echo ==========================================

echo.
echo [1/2] Starting Python Backend (app.py) on port 5001...
start "IntelliBot Backend" cmd /k "cd backend && python app.py"

echo.
echo [2/2] Starting Next.js Frontend on port 3000...
start "IntelliBot Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Both servers are starting up in separate windows!
echo - Frontend will be available at: http://localhost:3000
echo - Backend is running at: http://127.0.0.1:5001
echo.
echo You can close this window now. The servers will keep running in the new command prompt windows that just opened.
pause
