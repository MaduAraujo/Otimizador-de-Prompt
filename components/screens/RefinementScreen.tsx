import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { getGenerativeResponse } from '../../services/geminiService';
import { PromptState, TutorialStep, RefinementStepFormProps } from '../../types';
import Timeline from '../Timeline';
import PromptDisplay from '../PromptDisplay';
import SearchIcon from '../icons/SearchIcon';
import UserIcon from '../icons/UserIcon';
import UsersIcon from '../icons/UsersIcon';
import MessageCircleIcon from '../icons/MessageCircleIcon';
import FileTextIcon from '../icons/FileTextIcon';
import ListIcon from '../icons/ListIcon';
import SlidersIcon from '../icons/SlidersIcon';

const ObjectiveStepForm = React.lazy(() => import('../refinement_steps/ObjectiveStepForm'));
const PersonaStepForm = React.lazy(() => import('../refinement_steps/PersonaStepForm'));
const AudienceStepForm = React.lazy(() => import('../refinement_steps/AudienceStepForm'));
const ToneStepForm = React.lazy(() => import('../refinement_steps/ToneStepForm'));
const FormatStepForm = React.lazy(() => import('../refinement_steps/FormatStepForm'));
const ExamplesStepForm = React.lazy(() => import('../refinement_steps/ExamplesStepForm'));
const ConstraintsStepForm = React.lazy(() => import('../refinement_steps/ConstraintsStepForm'));

interface RefinementScreenProps {
  basePrompt: string;
  onFinish: (finalStates: PromptState[]) => void;
}

const tutorialSteps: TutorialStep[] = [
  { id: 1, title: "Defina o Objetivo", instruction: "O que você quer que a IA faça?", placeholder: "Ex: Gerar um resumo de um artigo longo.", buildPrompt: (base, input) => `O objetivo principal é: ${input}.\n\nO prompt original é:\n"${base}"`, icon: SearchIcon, timelineTitle: "Objetivo" },
  { id: 2, title: "Adote uma Persona", instruction: "Que persona a IA deve ser?", placeholder: "Ex: Um especialista em história medieval.", buildPrompt: (base, input) => `${base}\n\nAssuma a persona de: ${input}.`, icon: UserIcon, timelineTitle: "Persona" },
  { id: 3, title: "Considere o Público", instruction: "Para quem é a resposta?", placeholder: "Ex: Crianças de 10 anos.", buildPrompt: (base, input) => `${base}\n\nA resposta deve ser adequada para: ${input}.`, icon: UsersIcon, timelineTitle: "Público" },
  { id: 4, title: "Especifique o Tom", instruction: "Qual deve ser o tom da resposta?", placeholder: "Ex: Formal, bem-humorado, inspirador.", buildPrompt: (base, input) => `${base}\n\nUse um tom: ${input}.`, icon: MessageCircleIcon, timelineTitle: "Tom" },
  { id: 5, title: "Defina o Formato", instruction: "Em que formato a resposta deve ser apresentada?", placeholder: "Ex: Uma lista com marcadores.", buildPrompt: (base, input) => `${base}\n\nApresente a resposta no formato de: ${input}.`, icon: FileTextIcon, timelineTitle: "Formato" },
  { id: 6, title: "Forneça Exemplos", instruction: "Dê um ou dois exemplos de como a resposta deve ser.", placeholder: "Ex: Se eu perguntar 'maçã', responda 'Fruta vermelha ou verde'.", buildPrompt: (base, input) => `${base}\n\nAqui estão alguns exemplos de como a resposta deve ser:\n${input}`, icon: ListIcon, timelineTitle: "Exemplos" },
  { id: 7, title: "Adicione Restrições", instruction: "Quais são as restrições ou regras que a IA deve seguir?", placeholder: "Ex: Não use jargões técnicos, limite a resposta a 100 palavras.", buildPrompt: (base, input) => `${base}\n\nSiga estas restrições:\n- ${input.split('\n').join('\n- ')}`, icon: SlidersIcon, timelineTitle: "Restrições" },
];

const stepComponentMap: Record<number, React.FC<RefinementStepFormProps>> = {
  1: ObjectiveStepForm, 2: PersonaStepForm, 3: AudienceStepForm, 4: ToneStepForm, 5: FormatStepForm, 6: ExamplesStepForm, 7: ConstraintsStepForm,
};


const RefinementScreen: React.FC<RefinementScreenProps> = ({ basePrompt, onFinish }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [promptStates, setPromptStates] = useState<PromptState[]>([
    { id: 0, prompt: basePrompt, response: '', isLoading: true, error: null }
  ]);
  const [userInput, setUserInput] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const generateInitialResponse = async () => {
      try {
        const response = await getGenerativeResponse(basePrompt);
        setPromptStates(prev => prev.map(p => p.id === 0 ? { ...p, response, isLoading: false } : p));
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
        setPromptStates(prev => prev.map(p => p.id === 0 ? { ...p, error: errorMessage, isLoading: false } : p));
      }
    };
    generateInitialResponse();
  }, [basePrompt]);

  const currentStep = tutorialSteps[currentStepIndex];
  const StepComponent = currentStep ? stepComponentMap[currentStep.id] : null;

  const handleNextStep = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return; // Não processa se a entrada estiver vazia

    setShowForm(false);

    const previousPrompt = promptStates[promptStates.length - 1].prompt;
    const newPrompt = currentStep.buildPrompt(previousPrompt, trimmedInput);
    const newPromptState: PromptState = { id: promptStates.length, prompt: newPrompt, response: '', isLoading: true, error: null };

    setPromptStates(prev => [...prev, newPromptState]);
    setUserInput('');

    try {
        const response = await getGenerativeResponse(newPrompt);
        setPromptStates(prev => {
            const newStates = prev.map(p => p.id === newPromptState.id ? { ...p, response, isLoading: false } : p);
            if (currentStepIndex >= tutorialSteps.length - 1) {
                onFinish(newStates);
            } else {
                setCurrentStepIndex(prev => prev + 1);
            }
            return newStates;
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.';
        setPromptStates(prev => {
            const newStates = prev.map(p => p.id === newPromptState.id ? { ...p, error: errorMessage, isLoading: false } : p);
            if (currentStepIndex >= tutorialSteps.length - 1) {
                onFinish(newStates);
            } else {
                setCurrentStepIndex(prev => prev + 1);
            }
            return newStates;
        });
    }
  };

  const isGenerating = useMemo(() => promptStates[promptStates.length - 1]?.isLoading ?? false, [promptStates]);
  const isLastStep = currentStepIndex === tutorialSteps.length - 1;

  return (
    <div className="flex flex-col md:flex-row">
      <Timeline steps={tutorialSteps} currentStepIndex={currentStepIndex} />
      <div className="flex-1 md:pl-8">
        
        <div className="space-y-10 mb-10">
          {promptStates.map((state, index) => (
            <div key={state.id}>
              <h2 className="text-2xl font-bold text-gray-300 mb-4 pb-2 border-b border-gray-700">
                {index === 0 ? 'Etapa Inicial' : `Etapa ${index}: ${tutorialSteps[index - 1]?.timelineTitle || 'Refinamento'}`}
              </h2>
              <PromptDisplay promptState={state} />
            </div>
          ))}
        </div>

        {!isGenerating && !showForm && currentStepIndex < tutorialSteps.length && (
          <div className="flex justify-center mt-6 animate-fade-in">
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded-md transition duration-300"
            >
              Avançar
            </button>
          </div>
        )}

        {showForm && StepComponent && (
          <div className="bg-gray-800 p-6 rounded-lg animate-fade-in">
            <Suspense fallback={<div className="text-center p-8">Carregando...</div>}>
              <StepComponent
                step={currentStep}
                userInput={userInput}
                setUserInput={setUserInput}
                handleNextStep={handleNextStep}
                isGenerating={isGenerating}
                isLastStep={isLastStep}
              />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefinementScreen;