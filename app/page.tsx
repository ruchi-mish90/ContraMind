'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, Sword } from 'lucide-react';

export default function Home() {
  const [belief, setBelief] = useState('');
  const router = useRouter();

  const startDebate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!belief.trim()) return;
    
    // Generate a unique ID (in a real app, this comes from Supabase)
    const id = Math.random().toString(36).substring(7);
    
    // Redirect to the dynamic debate route
    router.push(`/debate/${id}?initial=${encodeURIComponent(belief)}`);
  };

  const exampleBeliefs = [
    "Hard work always leads to success",
    "Money can't buy happiness", 
    "Everything happens for a reason",
    "Democracy is the best form of government",
    "Artificial intelligence will replace human creativity"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 max-w-4xl"
      >
        {/* Logo and Tagline */}
        <div className="space-y-4">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Brain className="w-16 h-16 text-purple-400" />
            <h1 className="text-7xl font-black tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              CONTRAMIND
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-gray-300 mb-2"
          >
            The World's First Cognitive Gym
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-purple-300 italic"
          >
            "If you can't defend it, you don't believe it."
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12"
        >
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl">
            <Target className="w-8 h-8 text-red-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Steel-Man Protocol</h3>
            <p className="text-sm text-gray-400">We perfect your argument before destroying it</p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl">
            <Zap className="w-8 h-8 text-yellow-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Fallacy Sniper</h3>
            <p className="text-sm text-gray-400">Real-time detection of logical inconsistencies</p>
          </div>
          
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-2xl">
            <Sword className="w-8 h-8 text-blue-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">Socratic Warfare</h3>
            <p className="text-sm text-gray-400">Intellectual combat through piercing questions</p>
          </div>
        </motion.div>

        {/* Main Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <p className="text-xl text-gray-300">
            Enter a core belief. Let the adversary <span className="text-red-400 font-bold">shatter your echo chamber</span>.
          </p>
          
          <form onSubmit={startDebate} className="w-full space-y-4">
            <label htmlFor="belief-input" className="sr-only">
              Enter your core belief to challenge
            </label>
            <input
              id="belief-input"
              name="belief"
              type="text"
              value={belief}
              onChange={(e) => setBelief(e.target.value)}
              placeholder="e.g. 'Hard work always leads to success'"
              autoComplete="off"
              aria-label="Enter your core belief to challenge"
              className="w-full bg-white/10 border border-purple-500/30 rounded-2xl py-6 px-8 text-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all backdrop-blur-xl"
            />
            <button 
              type="submit"
              disabled={!belief.trim()}
              aria-label="Start the cognitive gym debate"
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              ENTER THE COGNITIVE GYM
            </button>
          </form>

          {/* Example Beliefs */}
          <div className="space-y-3">
            <p className="text-sm text-gray-500">Or try one of these beliefs:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {exampleBeliefs.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setBelief(example)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-all"
                >
                  "{example}"
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="space-y-4"
        >
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
            <p className="text-red-300 text-sm">
              ⚠️ <strong>Warning:</strong> ContraMind is designed to be intellectually ruthless. 
              Prepare to have your beliefs challenged, deconstructed, and rebuilt from first principles.
            </p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-900/20 to-gold-900/20 border border-purple-500/30 rounded-xl">
            <div className="text-center space-y-2">
              <div className="text-lg font-bold text-purple-300">🏆 The Master Thinker Path</div>
              <div className="text-sm text-gray-400">
                Reach 100% Logic Score to unlock:
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-yellow-400">👑 Grandmaster Status</div>
                <div className="text-blue-400">🥊 Persona Battles</div>
                <div className="text-green-400">🧠 Philosophy Masters</div>
                <div className="text-red-400">⚔️ 7-Day Challenge</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}