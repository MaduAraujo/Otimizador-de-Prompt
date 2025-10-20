import React from 'react';
import { PromptState } from '../types';
import UserIcon from './icons/UserIcon';
import RobotIcon from './icons/RobotIcon';

interface PromptDisplayProps {
  promptState: PromptState;
}

const PromptDisplay: React.FC<PromptDisplayProps> = ({ promptState }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-200">Seu prompt</p>
            <p className="text-gray-300 whitespace-pre-wrap">{promptState.prompt}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-900 flex items-center justify-center">
            <RobotIcon className="h-5 w-5 text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-200">Resposta da IA</p>
            {promptState.isLoading ? (
              <div className="flex items-center space-x-2 pt-2">
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse delay-150"></div>
              </div>
            ) : promptState.error ? (
              <p className="text-red-400">{promptState.error}</p>
            ) : (
              <p className="text-gray-300 whitespace-pre-wrap">{promptState.response}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptDisplay;