# MCP Tool Documentation

## Overview

The MCP (Multi-Model Control Panel) Tool is a powerful web application that allows you to analyze web projects and UI interfaces using multiple AI models. It provides insights on UI/UX design, accessibility, and code quality.

## Features

- **Multi-Model Analysis**: Choose between different AI models (Hugging Face Vision, TensorFlow.js)
- **Visual Analysis**: Upload screenshots or renders of your web projects
- **Code Analysis**: Submit HTML, CSS, and JavaScript for AI evaluation
- **Feedback Categories**:
  - UX/UI Design Analysis
  - Accessibility Recommendations
  - Code Improvement Suggestions
- **Interactive Feedback**: Apply suggested changes directly to your code

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ayushop123321/CURSOR-WEBVIEW-Tool.git
   cd CURSOR-WEBVIEW-Tool
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory
   - Add your Hugging Face API key:
     ```
     HUGGINGFACE_API_KEY=your_api_key_here
     ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## How to Use

1. **Select an AI Model**: Choose between Hugging Face Vision or TensorFlow.js
2. **Upload Files**:
   - Upload a screenshot or image of your web project
   - Optionally upload HTML, CSS, or JavaScript files
3. **Analyze**: Click the "Analyze" button to process your files
4. **Review Feedback**:
   - UX/UI issues and recommendations
   - Accessibility concerns and improvements
   - Code optimization suggestions
5. **Apply Changes**: Use the "Apply Changes" button to implement suggested improvements

## AI Models

### Hugging Face Vision
Uses computer vision models to analyze layouts, color schemes, and visual hierarchies in web interfaces.

### TensorFlow.js
Provides local analysis of screenshots and code using pre-trained models that run directly in your browser.

## API Endpoints

The backend provides the following API endpoints:

- `POST /api/analyze`: Analyze uploaded files and code
  - Parameters:
    - `file`: Image file (screenshot or render)
    - `code`: Code snippet (HTML, CSS, JS)
    - `model`: Selected AI model (huggingface or tensorflow)

- `POST /api/apply-changes`: Apply suggested changes to code
  - Parameters:
    - `changes`: Array of change objects specifying file and modifications

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Hugging Face](https://huggingface.co/) for providing free AI models
- [TensorFlow.js](https://www.tensorflow.org/js) for browser-based machine learning
- [Next.js](https://nextjs.org/) and [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend API 