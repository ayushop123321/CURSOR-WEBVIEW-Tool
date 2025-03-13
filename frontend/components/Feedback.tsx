import React from 'react';

interface FeedbackProps {
  feedback: {
    uxIssues: string[];
    accessibilityIssues: string[];
    codeImprovements: {
      file: string;
      suggestions: string[];
    }[];
  };
  onApplyChanges: (changes: any) => void;
}

const Feedback: React.FC<FeedbackProps> = ({ feedback, onApplyChanges }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* UX Issues Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">UX/UI Issues</h2>
        <ul className="space-y-2">
          {feedback.uxIssues.map((issue, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-red-500">•</span>
              <span className="ml-2 text-gray-700">{issue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Accessibility Issues Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Accessibility Issues</h2>
        <ul className="space-y-2">
          {feedback.accessibilityIssues.map((issue, index) => (
            <li key={index} className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-yellow-500">•</span>
              <span className="ml-2 text-gray-700">{issue}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Code Improvements Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Code Improvements</h2>
        {feedback.codeImprovements.map((improvement, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{improvement.file}</h3>
            <ul className="space-y-2">
              {improvement.suggestions.map((suggestion, sIndex) => (
                <li key={sIndex} className="flex items-start">
                  <span className="flex-shrink-0 h-6 w-6 text-green-500">•</span>
                  <span className="ml-2 text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Apply Changes Button */}
      <div className="flex justify-center">
        <button
          onClick={() => onApplyChanges(feedback.codeImprovements)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Apply Suggested Changes
        </button>
      </div>
    </div>
  );
};

export default Feedback; 