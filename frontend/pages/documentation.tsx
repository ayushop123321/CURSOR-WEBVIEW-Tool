import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Documentation - MCP Tool</title>
        <meta name="description" content="MCP Tool documentation - Learn how to use the AI-powered web analysis tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          MCP Tool Documentation
        </h1>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            The MCP (Multi-Model Control Panel) Tool is a powerful web application that allows you to analyze 
            web projects and UI interfaces using multiple AI models. It provides insights on UI/UX design, 
            accessibility, and code quality.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Multi-Model Analysis</strong>: Choose between different AI models (Hugging Face Vision, TensorFlow.js)</li>
            <li><strong>Visual Analysis</strong>: Upload screenshots or renders of your web projects</li>
            <li><strong>Code Analysis</strong>: Submit HTML, CSS, and JavaScript for AI evaluation</li>
            <li>
              <strong>Feedback Categories</strong>:
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>UX/UI Design Analysis</li>
                <li>Accessibility Recommendations</li>
                <li>Code Improvement Suggestions</li>
              </ul>
            </li>
            <li><strong>Interactive Feedback</strong>: Apply suggested changes directly to your code</li>
          </ul>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Use</h2>
          <ol className="list-decimal pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Select an AI Model</strong>: 
              <p className="mt-1">Choose between Hugging Face Vision or TensorFlow.js from the dropdown menu.</p>
            </li>
            <li>
              <strong>Upload Files</strong>:
              <p className="mt-1">Upload a screenshot or image of your web project. Optionally upload HTML, CSS, or JavaScript files for analysis.</p>
            </li>
            <li>
              <strong>Analyze</strong>:
              <p className="mt-1">Click the "Analyze" button to process your files using the selected AI model.</p>
            </li>
            <li>
              <strong>Review Feedback</strong>:
              <p className="mt-1">Examine the AI-generated feedback, including UX/UI issues, accessibility concerns, and code optimization suggestions.</p>
            </li>
            <li>
              <strong>Apply Changes</strong>:
              <p className="mt-1">Use the "Apply Changes" button to implement suggested improvements to your code.</p>
            </li>
          </ol>
        </div>

        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">AI Models</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Hugging Face Vision</h3>
            <p className="text-gray-700">
              Uses computer vision models to analyze layouts, color schemes, and visual hierarchies in web interfaces.
              This model is particularly good at identifying visual design issues and suggesting improvements.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">TensorFlow.js</h3>
            <p className="text-gray-700">
              Provides local analysis of screenshots and code using pre-trained models that run directly in your browser.
              This approach offers privacy benefits as your data doesn't leave your computer during analysis.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} MCP Tool. All rights reserved.</p>
          <p className="mt-2">
            <a 
              href="https://github.com/ayushop123321/CURSOR-WEBVIEW-Tool" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-100"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Documentation; 