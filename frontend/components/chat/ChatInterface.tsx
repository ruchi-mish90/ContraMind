'use client';
import { useChat } from 'ai/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebateStore } from '../../store/useDebateStore';
import { useState } from 'react';
import { PERSONA_BATTLES, getUnlockedPersonas } from '../../../backend/lib/persona-battles';
import { getPersonaTheme } from '../../../backend/lib/persona-themes';
import { analyzeSentiment, calculatePressureGauge } from '../../../backend/lib/pressure-gauge';

export default function ChatInterface() {
  const [pressureGauge, setPressureGauge] = useState<{
    pressure: number; 
    shouldInterrupt: boolean; 
    aggressionLevel: 'PASSIVE' | 'ASSERTIVE' | 'AGGRESSIVE' | 'RUTHLESS';
  }>({ pressure: 0, shouldInterrupt: false, aggressionLevel: 'PASSIVE' });
  
  const { logicScore, selectedPersona, setSelectedPersona } = useDebateStore();
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    body: {
      persona: selectedPersona
    },
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: (message) => {
      // Parse AI response for logic metrics
      const content = message.content;
      const logicScoreMatch = content.match(/📊 LOGIC SCORE:\s*(\d+)/);
      const fallacyMatch = content.match(/🚨 FALLACY ALERT:\s*([^🔍\n]+)/);
      
      if (logicScoreMatch) {
        const score = parseInt(logicScoreMatch[1]);
        const fallacies = fallacyMatch && fallacyMatch[1].trim() !== 'None' 
          ? [fallacyMatch[1].trim()] 
          : [];
        
        useDebateStore.getState().updateStats(score, fallacies);
        
        // Calculate pressure gauge based on user's last message
        if (input) {
          const sentiment = analyzeSentiment(input);
          const gauge = calculatePressureGauge(sentiment, score);
          setPressureGauge(gauge);
        }
      }
    }
  });
  
  const unlockedPersonas = getUnlockedPersonas(logicScore);
  const currentTheme = selectedPersona ? getPersonaTheme(selectedPersona) : null;

  return (
    <div className={`flex flex-col h-full text-white p-4 transition-all duration-500 ${
      currentTheme ? currentTheme.background : 'bg-[#0a0a0a]'
    } ${currentTheme ? currentTheme.cssClass : ''}`}>
      
      {/* Persona Battle Selection - Only show if Master Thinker unlocked */}
      {logicScore >= 95 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-4 bg-black/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-purple-400 tracking-widest uppercase">
              🎭 PERSONA BATTLES
            </span>
            {selectedPersona && (
              <span className="text-xs text-gray-400">
                vs {PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name}
              </span>
            )}
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedPersona(null)}
              aria-label="Switch to Cognitive Gym mode"
              aria-pressed={!selectedPersona}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                !selectedPersona 
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' 
                  : 'bg-gray-700/30 text-gray-400 hover:bg-gray-600/30'
              }`}
            >
              🧠 Cognitive Gym
            </button>
            
            {unlockedPersonas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                aria-label={`Switch to ${persona.name} persona battle mode`}
                aria-pressed={selectedPersona === persona.id}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  selectedPersona === persona.id
                    ? `${currentTheme?.accentColor || 'text-purple-300'} bg-purple-500/30 border border-purple-500/50`
                    : 'bg-gray-700/30 text-gray-400 hover:bg-gray-600/30'
                }`}
                title={persona.description}
              >
                {persona.avatar} {persona.name}
              </button>
            ))}
          </div>
          
          {selectedPersona && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-3 bg-black/20 rounded-xl"
            >
              <div className="text-xs text-gray-300">
                <strong>Special Ability:</strong> {PERSONA_BATTLES.find(p => p.id === selectedPersona)?.specialAbility}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Pressure Gauge - Shows when persona is active */}
      {selectedPersona && pressureGauge.pressure > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 p-3 bg-red-900/20 border border-red-500/30 rounded-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-red-400">⚡ PRESSURE GAUGE</span>
            <span className="text-xs text-red-300">{pressureGauge.aggressionLevel}</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"
              animate={{ width: `${Math.min(100, pressureGauge.pressure * 50)}%` }}
              transition={{ type: 'spring', stiffness: 100 }}
            />
          </div>
          {pressureGauge.shouldInterrupt && (
            <div className="text-xs text-red-300 mt-1">
              🚨 High pressure detected - AI aggression increased
            </div>
          )}
        </motion.div>
      )}

      {/* Rationality Heatmap */}
      <div className="w-full h-2 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <motion.div 
          className={`h-full ${
            currentTheme 
              ? 'bg-gradient-to-r from-red-500 to-current' 
              : 'bg-gradient-to-r from-red-500 to-blue-500'
          }`}
          style={{ color: currentTheme?.accentColor }}
          animate={{ width: `${logicScore}%` }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
            <p className="text-sm">Error: {error.message}</p>
            <p className="text-xs mt-2 opacity-70">
              Make sure to add your Groq API key to .env.local
            </p>
          </div>
        )}
        
        {messages.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              {selectedPersona 
                ? `Challenge ${PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name}`
                : 'Welcome to ContraMind'
              }
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              {selectedPersona 
                ? `Engage in philosophical combat with ${PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name}. State your position and prepare for intellectual warfare.`
                : 'State any belief or opinion to begin your cognitive training. I will challenge your reasoning and help you think more clearly.'
              }
            </p>
          </motion.div>
        )}
        
        <AnimatePresence>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl max-w-[80%] ${
                m.role === 'user' 
                ? `${currentTheme?.textColor || 'text-white'} bg-white/10 border ${currentTheme?.borderColor || 'border-white/20'} self-end ml-auto` 
                : `${currentTheme?.textColor || 'text-white'} bg-blue-500/10 border ${currentTheme?.borderColor || 'border-blue-500/20'} backdrop-blur-lg`
              }`}
            >
              <div className="text-xs opacity-50 mb-2">
                {m.role === 'user' ? 'You' : selectedPersona ? PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name || 'ContraMind' : 'ContraMind Adversary'}
              </div>
              <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">
                {m.content}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 rounded-2xl max-w-[80%] bg-blue-500/10 border ${currentTheme?.borderColor || 'border-blue-500/20'} backdrop-blur-lg`}
          >
            <div className="text-xs opacity-50 mb-2">
              {selectedPersona ? PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name || 'ContraMind' : 'ContraMind Adversary'}
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${currentTheme?.accentColor || 'bg-blue-400'} rounded-full animate-pulse`}></div>
              <div className={`w-2 h-2 ${currentTheme?.accentColor || 'bg-blue-400'} rounded-full animate-pulse`} style={{animationDelay: '0.2s'}}></div>
              <div className={`w-2 h-2 ${currentTheme?.accentColor || 'bg-blue-400'} rounded-full animate-pulse`} style={{animationDelay: '0.4s'}}></div>
              <span className={`text-sm ${currentTheme?.accentColor || 'text-blue-400'} ml-2`}>
                {selectedPersona ? 'Preparing philosophical assault...' : 'Analyzing your logic...'}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input - Glassmorphism with Persona Theming */}
      <form onSubmit={handleSubmit} className="relative">
        <label htmlFor="chat-input" className="sr-only">
          {selectedPersona 
            ? `Challenge ${PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name}`
            : messages.length === 0 
              ? "State your belief to begin the debate" 
              : "Continue the debate"
          }
        </label>
        <input
          id="chat-input"
          name="message"
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={
            selectedPersona 
              ? `Challenge ${PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name}...`
              : messages.length === 0 
                ? "State your belief to begin the debate..." 
                : "Continue the debate..."
          }
          disabled={isLoading}
          autoComplete="off"
          aria-label={
            selectedPersona 
              ? `Challenge ${PERSONA_BATTLES.find(p => p.id === selectedPersona)?.name}`
              : messages.length === 0 
                ? "State your belief to begin the debate" 
                : "Continue the debate"
          }
          className={`w-full bg-white/5 border ${currentTheme?.borderColor || 'border-white/10'} rounded-full py-4 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md disabled:opacity-50 ${currentTheme?.textColor || 'text-white'}`}
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <div className={`w-4 h-4 border-2 ${currentTheme?.accentColor || 'border-blue-400'} border-t-transparent rounded-full animate-spin`}></div>
          </div>
        )}
      </form>
    </div>
  );
}