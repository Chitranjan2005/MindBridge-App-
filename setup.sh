#!/bin/bash

echo "🧠 MindBridge Setup Script"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend installation failed"
    exit 1
fi
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please add your ANTHROPIC_API_KEY or OPENAI_API_KEY to backend/.env"
else
    echo "✅ .env file already exists"
fi
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend installation failed"
    exit 1
fi
echo ""

cd ..

echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add your API key to backend/.env"
echo "2. Run 'cd backend && npm run dev' in one terminal"
echo "3. Run 'cd frontend && npm run dev' in another terminal"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 Check README.md for detailed instructions"
