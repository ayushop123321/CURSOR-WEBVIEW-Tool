import React, { useState } from 'react';
import Head from 'next/head';
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

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setFeedback(null);
  };

  const handleCodeUpload = (code: string) => {
    setUploadedCode(code);
    setFeedback(null);
  };

  const handleAnalyze = async () => {
    if (!uploadedFile && !uploadedCode) return;

    setIsAnalyzing(true);
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
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      console.error('Analysis error:', error);
      // Handle error appropriately
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
        body: JSON.stringify(changes),
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

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          MCP Tool - AI-Powered Web Analysis
        </h1>

        <div className="space-y-8">
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

          {/* Analyze Button */}
          {(uploadedFile || uploadedCode) && (
            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className={`px-6 py-3 rounded-md text-white ${
                  isAnalyzing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          )}

          {/* Feedback Section */}
          {feedback && (
            <Feedback
              feedback={feedback}
              onApplyChanges={handleApplyChanges}
            />
          )}
        </div>
      </main>
    </div>
  );
} 