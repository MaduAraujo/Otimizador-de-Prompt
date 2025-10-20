import React, { useState } from 'react';

interface WelcomeScreenProps {
  onStart: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [prompt, setPrompt] = useState('');

  const handleStart = () => {
    if (prompt.trim()) {
      onStart(prompt.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">Comece com sua ideia inicial</h2>
        <p className="text-center text-gray-400 mb-8">
          Digite o prompt que você deseja refinar.
        </p>
        <textarea
          className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500 resize-none"
          placeholder="Ex: Escreva uma história curta sobre um robô que descobre a música..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleStart();
            }
          }}
        />
        <button
          onClick={handleStart}
          disabled={!prompt.trim()}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Otimizar
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;