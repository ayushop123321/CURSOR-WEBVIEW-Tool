# MCP (Multi-Model Control Panel) Tool

A powerful tool for analyzing web projects using multiple AI models (Claude 3.5/3.7, GPT-4 Vision) to provide UX/UI feedback and code improvements.

## Features

- Multi-model support (Claude 3.5/3.7, GPT-4 Vision)
- Live preview and screenshot analysis
- Code analysis and improvement suggestions
- UX/UI feedback and accessibility recommendations
- Direct code modification capabilities

## Tech Stack

- Frontend: Next.js (React)
- Backend: Node.js with Express
- AI Models: Claude 3.5/3.7, GPT-4 Vision
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- API keys for OpenAI and Anthropic

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Set up environment variables:
   Create `.env` files in both frontend and backend directories with:
   ```
   # Frontend .env
   NEXT_PUBLIC_API_URL=http://localhost:3001

   # Backend .env
   OPENAI_API_KEY=your_openai_key
   ANTHROPIC_API_KEY=your_anthropic_key
   PORT=3001
   ```

4. Start the development servers:
   ```bash
   # Start backend (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Project Structure

```
mcp-tool/
├── frontend/           # Next.js frontend application
│   ├── components/    # React components
│   ├── pages/        # Next.js pages
│   └── styles/       # CSS styles
├── backend/          # Node.js/Express backend
│   ├── controllers/  # Route controllers
│   ├── routes/      # API routes
│   └── services/    # Business logic
└── README.md
```

## API Endpoints

- `POST /api/upload` - Upload screenshots and code files
- `POST /api/analyze` - Analyze content with selected AI model
- `POST /api/feedback` - Get AI feedback and suggestions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 