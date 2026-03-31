// Core Types for ContraMind Application

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface DebateState {
  messages: Message[];
  logicScore: number;
  detectedFallacies: string[];
  isThinking: boolean;
}

export interface DebateActions {
  addMessage: (message: Omit<Message, 'id'>) => void;
  updateStats: (score: number, fallacies: string[]) => void;
  setThinking: (status: boolean) => void;
  clearMessages: () => void;
}

export interface SocraticResponse {
  score: number;
  fallacy: string;
  question: string;
}