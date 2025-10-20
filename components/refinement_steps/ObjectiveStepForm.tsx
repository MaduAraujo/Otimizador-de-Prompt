import React from 'react';
import { RefinementStepFormProps } from '../../types';

const ObjectiveStepForm: React.FC<RefinementStepFormProps> = ({ step, userInput, setUserInput, handleNextStep, isGenerating }) => {
    const isInputEmpty = !userInput.trim();
    
    return (
        <div>
            <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center mr-3">
                    <step.icon className="h-5 w-5 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-100">{step.title}</h2>
            </div>
            <p className="text-gray-400 mb-4">{step.instruction}</p>
            <textarea
                className="w-full h-28 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-200 placeholder-gray-500 resize-none"
                placeholder={step.placeholder}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={isGenerating}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (!isInputEmpty) handleNextStep();
                  }
                }}
            />
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleNextStep}
                    disabled={isGenerating || isInputEmpty}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-5 rounded-md transition duration-300"
                >
                    {isGenerating ? 'Aplicando...' : 'Aplicar'}
                </button>
            </div>
        </div>
    );
};

export default ObjectiveStepForm;