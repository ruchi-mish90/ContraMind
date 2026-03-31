import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Message, DebateState, DebateActions } from '../types/index';

/**
 * @file useDebateStore.ts
 * @description Refined state orchestrator for ContraMind.
 * Handles the persistent dialectic state and complex transitions.
 */

// We extend the base types to include project-specific logic
export type DialecticStage = 'ENTRY' | 'STEELMAN' | 'REBUTTAL' | 'GRANDMASTER';

interface ExtendedState extends DebateState {
  activeStage: DialecticStage;
  pressureIndex: number;
  selectedPersona: string | null;
}

interface ExtendedActions extends DebateActions {
  setSelectedPersona: (persona: string | null) => void;
  setStage: (stage: DialecticStage) => void;
  updatePressure: (index: number) => void;
  resetSession: () => void;
  addFallacies: (fallacies: string[]) => void;
}

type DebateStore = ExtendedState & ExtendedActions;

export const useDebateStore = create<DebateStore>()(
  persist(
    (set) => ({
      // --- Initial State ---
      messages: [] as Message[],
      logicScore: 70, // Start with a neutral-high baseline
      detectedFallacies: [] as string[],
      isThinking: false,
      selectedPersona: 'socrates', // Default persona
      activeStage: 'ENTRY',
      pressureIndex: 0,

      // --- Actions ---

      /**
       * Adds a message with professional metadata generation.
       */
      addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => 
        set((state) => ({ 
          messages: [...state.messages, { 
            ...message, 
            id: crypto.randomUUID(), // Production-standard unique IDs
            timestamp: new Date()
          }] 
        })),

      /**
       * Updates the logical performance metrics.
       */
      updateStats: (score: number, fallacies: string[]) => 
        set((state) => ({ 
          logicScore: Math.max(0, Math.min(100, score)),
          // Ensure uniqueness in fallacy detection
          detectedFallacies: Array.from(new Set([...state.detectedFallacies, ...fallacies]))
        })),

      addFallacies: (newFallacies: string[]) => 
        set((state) => ({
          detectedFallacies: Array.from(new Set([...state.detectedFallacies, ...newFallacies]))
        })),

      setThinking: (status: boolean) => 
        set({ isThinking: status }),

      setStage: (stage: DialecticStage) => 
        set({ activeStage: stage }),

      updatePressure: (index: number) => 
        set({ pressureIndex: Math.max(0, Math.min(100, index)) }),

      setSelectedPersona: (persona: string | null) =>
        set({ selectedPersona: persona }),

      /**
       * Clean wipe for new sparring sessions.
       */
      resetSession: () => 
        set({ 
          messages: [], 
          logicScore: 70, 
          detectedFallacies: [], 
          activeStage: 'ENTRY',
          pressureIndex: 0 
        }),

      clearMessages: () => 
        set({ messages: [], logicScore: 70, detectedFallacies: [] }),
    }),
    { 
      name: 'contramind-sparring-session',
      version: 2, // Incremented for new state structure
      storage: createJSONStorage(() => sessionStorage), // Preferred for active "gym" sessions
      onRehydrateStorage: () => (state) => {
        // Professional sanitization on load
        if (state) {
          state.isThinking = false; // Never resume in a "thinking" state
          if (!state.logicScore) state.logicScore = 70;
          if (!state.messages) state.messages = [];
          if (!state.detectedFallacies) state.detectedFallacies = [];
          if (!state.activeStage) state.activeStage = 'ENTRY';
        }
      }
    }
  )
);