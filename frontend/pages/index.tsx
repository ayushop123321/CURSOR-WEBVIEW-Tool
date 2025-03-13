import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import ModelSelector from '../components/ModelSelector';
import UploadPreview from '../components/UploadPreview';
import Feedback from '../components/Feedback';

// API base URL - make sure this points to the backend server
const API_BASE_URL = 'http://localhost:3001';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState('huggingface');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedCode, setUploadedCode] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setFeedback(null);
    setError(null);
  };

  const handleCodeUpload = (code: string) => {
    setUploadedCode(code);
    setFeedback(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile && !uploadedCode) {
      setError("Please upload a file or code to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      const formData = new FormData();
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }
      if (uploadedCode) {
        formData.append('code', uploadedCode);
      }
      formData.append('model', selectedModel);

      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again later.');
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Analysis error:', error);
      setError(`${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyChanges = async (changes: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/apply-changes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ changes }),
      });

      if (!response.ok) {
        throw new Error('Failed to apply changes');
      }

      // Handle successful changes
      alert('Changes applied successfully!');
    } catch (error) {
      console.error('Error applying changes:', error);
      alert('Failed to apply changes. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>MCP Tool - AI-Powered Web Analysis</title>
        <meta name="description" content="Analyze your web projects with AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-4">
          AI-Powered Web Analysis
        </h1>
        
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your website screenshots or code and get instant feedback on UI/UX, 
          accessibility, and code improvements using advanced AI models.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Select AI Model & Upload Files</h2>
            
            {/* Model Selection */}
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
            />

            {/* Upload/Preview Section */}
            <UploadPreview
              onFileUpload={handleFileUpload}
              onCodeUpload={handleCodeUpload}
            />

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                <p>{error}</p>
              </div>
            )}

            {/* Analyze Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || (!uploadedFile && !uploadedCode)}
                className={`px-6 py-3 rounded-md text-white font-medium ${
                  isAnalyzing || (!uploadedFile && !uploadedCode)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  'Analyze'
                )}
              </button>
            </div>
          </div>

          {/* Feedback Section */}
          {feedback && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Analysis Results</h2>
              <Feedback
                feedback={feedback}
                onApplyChanges={handleApplyChanges}
              />
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-20">
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
} 