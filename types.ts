export interface PromptState {
  id: number;
  prompt: string;
  response: string;
  isLoading: boolean;
  error: string | null;
}

export interface TutorialStep {
  id: number;
  title: string;
  instruction: string;
  placeholder: string;
  buildPrompt: (base: string, userInput: string) => string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  timelineTitle: string;
}

export interface RefinementStepFormProps {
  step: TutorialStep;
  userInput: string;
  setUserInput: (value: string) => void;
  handleNextStep: () => void;
  isGenerating: boolean;
  isLastStep: boolean;
}