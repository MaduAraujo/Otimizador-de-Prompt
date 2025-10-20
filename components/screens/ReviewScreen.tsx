import React from 'react';
import { PromptState } from '../../types';
import PromptDisplay from '../PromptDisplay';
import TrophyIcon from '../icons/TrophyIcon';

interface ReviewScreenProps {
  promptStates: PromptState[];
  onRestart: () => void;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ promptStates, onRestart }) => {
  const tutorialStepTitles = [
    "Objetivo",
    "Persona",
    "Público",
    "Tom",
    "Formato",
    "Exemplos",
    "Restrições"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gray-800 p-4 rounded-full mb-4">
          <TrophyIcon className="h-10 w-10 text-yellow-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Revisão do Prompt
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Veja a evolução do seu prompt.
        </p>
      </div>
      
      <div className="space-y-10">
        {promptStates.map((state, index) => (
          <div key={state.id}>
            <h2 className="text-2xl font-bold text-gray-300 mb-4 pb-2 border-b border-gray-700">
              {index === 0 ? 'Etapa Inicial' : `Etapa ${index}: ${tutorialStepTitles[index - 1] || 'Refinamento'}`}
            </h2>
            <PromptDisplay promptState={state} />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Otimizar Outro Prompt
        </button>
      </div>
    </div>
  );
};

export default ReviewScreen;