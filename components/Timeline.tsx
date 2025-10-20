import React from 'react';
import { TutorialStep } from '../types';

interface TimelineProps {
  steps: TutorialStep[];
  currentStepIndex: number;
}

const Timeline: React.FC<TimelineProps> = ({ steps, currentStepIndex }) => {
  return (
    <div className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0 md:pr-8">
      <ol className="relative border-l border-gray-700">
        {steps.map((step, index) => (
          <li key={step.id} className="mb-6 ml-6">
            <span
              className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-gray-900 ${
                index <= currentStepIndex ? 'bg-purple-900' : 'bg-gray-700'
              }`}
            >
              <step.icon
                className={`w-3 h-3 ${
                  index <= currentStepIndex ? 'text-purple-400' : 'text-gray-400'
                }`}
              />
            </span>
            <h3
              className={`font-medium ${
                index === currentStepIndex ? 'text-purple-400' : 'text-gray-400'
              }`}
            >
              {step.timelineTitle}
            </h3>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Timeline;
