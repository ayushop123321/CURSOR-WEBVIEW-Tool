import React from 'react';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const models = [
  { id: 'huggingface', name: 'Hugging Face Vision' },
  { id: 'tensorflow', name: 'TensorFlow.js' },
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-2">
        Select AI Model
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      <p className="mt-2 text-sm text-gray-500">
        Using free AI models for analysis
      </p>
    </div>
  );
};

export default ModelSelector; 