@echo off
title Smart Design Digital Pro - Starting...
echo.
echo ========================================
echo   Smart Design Digital Pro
echo   Starting your website...
echo ========================================
echo.
echo Please wait a moment...
echo.

cd /d "C:\Users\khaled\Desktop\000\smart-design-digital-pro"

echo Starting development server...
echo.

start http://localhost:3000

call npm run dev

pause
