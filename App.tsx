import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeScreen from './components/screens/WelcomeScreen';
import RefinementScreen from './components/screens/RefinementScreen';
import ReviewScreen from './components/screens/ReviewScreen';
import { PromptState } from './types';

type Screen = 'welcome' | 'refinement' | 'review';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [basePrompt, setBasePrompt] = useState('');
  const [promptStates, setPromptStates] = useState<PromptState[]>([]);

  const handleStart = useCallback((prompt: string) => {
    setBasePrompt(prompt);
    setPromptStates([]); 
    setCurrentScreen('refinement');
  }, []);

  const handleFinish = useCallback((finalStates: PromptState[]) => {
    setPromptStates(finalStates);
    setCurrentScreen('review');
  }, []);

  const handleRestart = useCallback(() => {
    setBasePrompt('');
    setPromptStates([]);
    setCurrentScreen('welcome');
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'refinement':
        return <RefinementScreen basePrompt={basePrompt} onFinish={handleFinish} />;
      case 'review':
        return <ReviewScreen promptStates={promptStates} onRestart={handleRestart} />;
      case 'welcome':
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        {currentScreen === 'welcome' && <Header />}
        <main>{renderScreen()}</main>
      </div>
      <Footer />
    </div>
  );
};

export default App;