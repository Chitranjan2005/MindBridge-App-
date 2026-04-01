@echo off
echo 🧠 MindBridge Setup Script
echo ==========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    exit /b 1
)

echo ✅ Node.js is installed
node -v
echo.

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend installation failed
    exit /b 1
)
echo ✅ Backend dependencies installed
echo.

REM Create .env file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ⚠️  Please add your ANTHROPIC_API_KEY or OPENAI_API_KEY to backend\.env
) else (
    echo ✅ .env file already exists
)
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend installation failed
    exit /b 1
)
echo ✅ Frontend dependencies installed
echo.

cd ..

echo 🎉 Setup complete!
echo.
echo 📋 Next steps:
echo 1. Add your API key to backend\.env
echo 2. Run 'cd backend && npm run dev' in one terminal
echo 3. Run 'cd frontend && npm run dev' in another terminal
echo 4. Open http://localhost:3000 in your browser
echo.
echo 📖 Check README.md for detailed instructions

pause
