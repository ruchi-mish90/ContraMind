'use client';
// app/debate/[id]/page.tsx
import { motion } from 'framer-motion';
import ChatInterface from '../../../frontend/components/chat/ChatInterface';
import FallacyCounter from '../../../frontend/components/stats/FallacyCounter';
import GrandmasterChallenge from '../../../frontend/components/challenges/GrandmasterChallenge';

export default function DebatePage({ params }: { params: { id: string } }) {
  // Extract id for future use (debate session identification)
  const { id } = params;
  
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0a0a0a] via-gray-900 to-[#0a0a0a]">
      {/* Main Chat Area */}
      <div className="flex-1 border-r border-purple-500/30">
        <ChatInterface />
      </div>
      
      {/* INSANE Sidebar with Stats and Challenges */}
      <div className="w-80 p-6 overflow-y-auto space-y-6 bg-gradient-to-b from-gray-900/90 via-purple-900/40 to-red-900/40 backdrop-blur-xl border-l-2 border-purple-500/50 relative">
        {/* NUCLEAR Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
              animate={{
                x: [0, 320, 0],
                y: [0, Math.random() * 800, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 8 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        {/* COSMIC Sidebar Header */}
        <motion.div 
          className="text-center pb-4 border-b-2 border-purple-500/40 relative z-10"
          animate={{
            boxShadow: [
              '0 0 20px rgba(128,0,128,0.5)',
              '0 0 40px rgba(255,0,255,0.8)',
              '0 0 20px rgba(128,0,128,0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-pulse rounded-xl"></div>
          
          <motion.h2 
            className="text-xl font-black text-purple-400 tracking-wider relative z-10"
            animate={{
              textShadow: [
                '0 0 10px rgba(128,0,128,0.8)',
                '0 0 20px rgba(255,0,255,0.8)',
                '0 0 10px rgba(128,0,128,0.8)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀 COGNITIVE WARFARE HQ 🚀
          </motion.h2>
          
          <p className="text-xs text-gray-300 font-mono relative z-10 font-bold">
            💀 Real-time Brain Annihilation 💀
          </p>
          
          <div className="flex justify-center gap-2 mt-3 relative z-10">
            {Array.from({ length: 5 }, (_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.3, 1, 0.3],
                  boxShadow: [
                    '0 0 5px rgba(128,0,128,0.5)',
                    '0 0 15px rgba(255,0,255,0.8)',
                    '0 0 5px rgba(128,0,128,0.5)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>

          {/* Pulsing border effect */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-500/50 rounded-xl"
            animate={{
              borderColor: [
                'rgba(128,0,128,0.5)',
                'rgba(255,0,255,0.8)',
                'rgba(128,0,128,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <div className="relative z-10">
          <FallacyCounter />
          <GrandmasterChallenge />
        </div>

        {/* INSANE Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 space-y-3 z-50">
          <motion.button
            className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-black shadow-lg"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              boxShadow: [
                '0 0 20px rgba(255,0,0,0.5)',
                '0 0 40px rgba(255,165,0,0.8)',
                '0 0 20px rgba(255,0,0,0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            🔥
          </motion.button>
          
          <motion.button
            className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black shadow-lg"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(128,0,128,0.5)',
                '0 0 40px rgba(255,20,147,0.8)',
                '0 0 20px rgba(128,0,128,0.5)'
              ]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            ⚡
          </motion.button>
          
          <motion.button
            className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-black shadow-lg"
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                '0 0 20px rgba(0,0,255,0.5)',
                '0 0 40px rgba(0,255,255,0.8)',
                '0 0 20px rgba(0,0,255,0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
          >
            🧠
          </motion.button>
        </div>
      </div>
    </div>
  );
}