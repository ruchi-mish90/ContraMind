// Persona Battle UI Theme System
export interface PersonaTheme {
  id: string;
  name: string;
  background: string;
  textColor: string;
  accentColor: string;
  borderColor: string;
  specialEffects: string[];
  cssClass: string;
}

export const PERSONA_THEMES: Record<string, PersonaTheme> = {
  socrates: {
    id: 'socrates',
    name: 'The Silence - Monochrome',
    background: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    textColor: 'text-gray-300',
    accentColor: 'text-gray-100',
    borderColor: 'border-gray-600',
    specialEffects: ['grayscale', 'high-contrast'],
    cssClass: 'socrates-mode'
  },
  
  nietzsche: {
    id: 'nietzsche',
    name: 'Hammer Mode - Blood Red',
    background: 'bg-gradient-to-br from-red-900 via-red-800 to-black',
    textColor: 'text-red-100',
    accentColor: 'text-red-300',
    borderColor: 'border-red-600',
    specialEffects: ['hammer-cracks', 'blood-drip'],
    cssClass: 'nietzsche-mode'
  },
  
  buddha: {
    id: 'buddha',
    name: 'Ego Dissolver - Ethereal',
    background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    textColor: 'text-blue-100',
    accentColor: 'text-purple-300',
    borderColor: 'border-purple-500',
    specialEffects: ['floating-particles', 'ethereal-glow'],
    cssClass: 'buddha-mode'
  },
  
  marx: {
    id: 'marx',
    name: 'Materialist Lens - Matrix Green',
    background: 'bg-gradient-to-br from-green-900 via-gray-900 to-black',
    textColor: 'text-green-100',
    accentColor: 'text-green-400',
    borderColor: 'border-green-600',
    specialEffects: ['matrix-rain', 'industrial-grid'],
    cssClass: 'marx-mode'
  }
};

export const getPersonaTheme = (personaId: string): PersonaTheme => {
  return PERSONA_THEMES[personaId] || PERSONA_THEMES.socrates;
};

// CSS Classes for Persona Modes
export const PERSONA_CSS = `
/* Socrates Mode - Monochrome */
.socrates-mode {
  filter: grayscale(0.8) contrast(1.2);
  transition: all 0.5s ease;
}

.socrates-mode .message-bubble {
  background: rgba(75, 85, 99, 0.3);
  border: 1px solid rgba(156, 163, 175, 0.5);
}

/* Nietzsche Mode - Blood Red with Hammer Effects */
.nietzsche-mode {
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(120, 0, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 0, 0, 0.3) 0%, transparent 50%);
  transition: all 0.5s ease;
}

.hammer-crack {
  position: relative;
  animation: crack 0.3s ease-out;
}

@keyframes crack {
  0% { transform: scale(1); }
  50% { transform: scale(1.05) rotate(1deg); }
  100% { transform: scale(1); }
}

.hammer-crack::after {
  content: '🔨';
  position: absolute;
  top: -10px;
  right: -10px;
  animation: hammer-strike 0.5s ease-out;
}

@keyframes hammer-strike {
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 0; }
}

/* Buddha Mode - Ethereal */
.buddha-mode {
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
  animation: ethereal-pulse 4s ease-in-out infinite;
}

@keyframes ethereal-pulse {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 1; }
}

.ego-highlight {
  background: rgba(147, 51, 234, 0.3);
  border-radius: 4px;
  padding: 2px 4px;
  animation: ego-dissolve 2s ease-out;
}

@keyframes ego-dissolve {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.3; transform: scale(0.95); }
}

/* Marx Mode - Matrix Green */
.marx-mode {
  background-image: 
    linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  animation: matrix-scroll 20s linear infinite;
}

@keyframes matrix-scroll {
  0% { background-position: 0 0; }
  100% { background-position: 20px 20px; }
}

.cost-calculator {
  background: rgba(34, 197, 94, 0.2);
  border: 1px solid rgba(34, 197, 94, 0.5);
  border-radius: 8px;
  padding: 8px;
  font-family: 'Courier New', monospace;
  animation: cost-calculate 1s ease-out;
}

@keyframes cost-calculate {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;