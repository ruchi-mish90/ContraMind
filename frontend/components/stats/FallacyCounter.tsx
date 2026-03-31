'use client';
import { useDebateStore } from '../../store/useDebateStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Target, Zap, Skull, Flame } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';

export default function FallacyCounter() {
  const { detectedFallacies, logicScore, messages } = useDebateStore();
  const [isExploding, setIsExploding] = useState(false);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [lastFallacyTime, setLastFallacyTime] = useState(0);
  const [mindChanges, setMindChanges] = useState(0);
  
  // Group identical fallacies and count them - memoized for performance
  const fallacyCounts = useMemo(() => {
    return detectedFallacies.reduce((acc: Record<string, number>, curr: string) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
  }, [detectedFallacies]);

  // Trigger explosion effects when logic score changes dramatically
  useEffect(() => {
    if (logicScore >= 95) {
      setIsExploding(true);
      setTimeout(() => setIsExploding(false), 2000);
    }
  }, [logicScore]);

  // Calculate mind changes based on logic score improvements
  useEffect(() => {
    const currentScore = logicScore;
    const previousScore = localStorage.getItem('previousLogicScore');
    
    if (previousScore && currentScore > parseInt(previousScore) + 5) {
      setMindChanges(prev => prev + 1);
    }
    
    localStorage.setItem('previousLogicScore', currentScore.toString());
  }, [logicScore]);

  // Initialize mind changes from localStorage
  useEffect(() => {
    const savedMindChanges = localStorage.getItem('mindChanges');
    if (savedMindChanges) {
      setMindChanges(parseInt(savedMindChanges));
    }
  }, []);

  // Save mind changes to localStorage
  useEffect(() => {
    localStorage.setItem('mindChanges', mindChanges.toString());
  }, [mindChanges]);

  // Calculate combo system
  useEffect(() => {
    const now = Date.now();
    if (detectedFallacies.length > 0 && now - lastFallacyTime < 10000) {
      setComboMultiplier(prev => Math.min(prev + 1, 10));
    } else {
      setComboMultiplier(1);
    }
    setLastFallacyTime(now);
  }, [detectedFallacies.length, lastFallacyTime]);

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'text-yellow-400 drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]';
    if (score >= 85) return 'text-green-400 drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]';
    if (score >= 70) return 'text-blue-400 drop-shadow-[0_0_6px_rgba(0,100,255,0.6)]';
    if (score >= 50) return 'text-orange-400 drop-shadow-[0_0_6px_rgba(255,165,0,0.6)]';
    return 'text-red-400 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 100) return '🔥 MIND_NUCLEAR_FUSION 🔥';
    if (score >= 95) return '⚡ STEEL_TRAP_MIND ⚡';
    if (score >= 85) return '🧠 LOGIC_BEAST_MODE 🧠';
    if (score >= 70) return '🎯 SHARP_SHOOTER 🎯';
    if (score >= 50) return '⚠️ WEAK_SAUCE ⚠️';
    return '💀 BRAIN_DEAD_ZONE 💀';
  };

  const getCognitiveLevel = (score: number) => {
    if (score >= 100) return '👑 COSMIC OVERLORD 👑';
    if (score >= 95) return '🔥 MIND ASSASSIN 🔥';
    if (score >= 85) return '⚡ LOGIC WARRIOR ⚡';
    if (score >= 75) return '🎯 BRAIN SNIPER 🎯';
    if (score >= 60) return '🧠 THOUGHT NINJA 🧠';
    if (score >= 45) return '🔰 MIND PADAWAN 🔰';
    return '💀 ZOMBIE BRAIN 💀';
  };

  const getNextChallenge = (score: number) => {
    if (score >= 100) return '🚀 UNLOCK: MULTIVERSE DEBATES & TIME TRAVEL LOGIC!';
    if (score >= 95) return '🔥 NEXT: COSMIC FUSION CHALLENGE (100%)';
    if (score >= 85) return '⚡ NEXT: MIND ASSASSIN TRIAL (95%)';
    if (score >= 75) return '🎯 NEXT: BRAIN SNIPER MODE (85%)';
    if (score >= 60) return '🧠 NEXT: THOUGHT NINJA TRAINING (75%)';
    return '💀 NEXT: ESCAPE THE ZOMBIE APOCALYPSE (60%)';
  };

  const getMasterBadge = (score: number) => {
    if (score >= 100) return '🌟 GODMODE';
    if (score >= 95) return '👑 EMPEROR';
    if (score >= 85) return '⚡ LEGEND';
    if (score >= 75) return '🔥 BEAST';
    if (score >= 60) return '🎯 HUNTER';
    return '💀 NOOB';
  };

  const getRandomExplosion = () => ['💥', '🔥', '⚡', '💀', '🌟', '💎', '🚀'][Math.floor(Math.random() * 7)];

  return (
    <div className="space-y-6 relative">
      {/* Explosion Effects */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 2, 1], rotate: [0, 360, 720] }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <div className="text-8xl animate-pulse">🔥💥🔥</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSANE Cognitive Gym Stats */}
      <motion.div 
        className="p-6 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-red-900/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-3xl relative overflow-hidden"
        animate={{ 
          boxShadow: logicScore >= 95 
            ? ['0 0 20px rgba(255,0,255,0.5)', '0 0 40px rgba(255,255,0,0.8)', '0 0 20px rgba(255,0,255,0.5)']
            : '0 0 10px rgba(128,0,128,0.3)'
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              animate={{
                x: [0, 300, 0],
                y: [0, 200, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 text-purple-400 font-mono text-xs tracking-widest uppercase relative z-10">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
            <Brain size={16} />
          </motion.div>
          <span className="animate-pulse">🔥 COGNITIVE WARFARE HQ 🔥</span>
        </div>
        
        <div className="text-center space-y-3 relative z-10">
          <motion.div 
            className={`text-6xl font-black ${getScoreColor(logicScore)} mb-2 relative block`}
            animate={{ 
              scale: logicScore >= 95 ? [1, 1.1, 1] : 1,
              textShadow: logicScore >= 95 ? [
                '0 0 10px rgba(255,255,0,0.8)',
                '0 0 20px rgba(255,0,255,0.8)',
                '0 0 10px rgba(255,255,0,0.8)'
              ] : 'none'
            }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {logicScore}%
            {logicScore >= 100 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 1], rotate: [0, 360] }}
                className="absolute -top-4 -right-4 text-4xl"
              >
                🌟💥🌟
              </motion.div>
            )}
            {logicScore >= 95 && (
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute -top-2 -left-2 text-2xl"
              >
                ⚡
              </motion.div>
            )}
          </motion.div>
          
          <motion.div 
            className="text-[10px] text-gray-300 font-mono font-black tracking-wider"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {getScoreLabel(logicScore)}
          </motion.div>
          
          <div className="text-sm text-purple-300 font-black">
            {getMasterBadge(logicScore)} {getCognitiveLevel(logicScore)}
          </div>
          
          <motion.div 
            className="text-[10px] text-blue-400 font-mono font-bold px-2 py-1 bg-blue-500/10 rounded"
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getNextChallenge(logicScore)}
          </motion.div>
        </div>

        {/* INSANE Conviction Heatmap */}
        <div className="mt-6 space-y-3 relative z-10">
          <div className="text-xs text-gray-300 font-mono font-bold flex items-center gap-2">
            <Flame size={12} className="text-red-400" />
            <span>🔥 CONVICTION INFERNO 🔥</span>
          </div>
          <div className="flex space-x-1">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                className={`h-3 flex-1 rounded-sm ${
                  i < Math.floor(logicScore / 10)
                    ? logicScore > 90
                      ? 'bg-gradient-to-t from-yellow-500 via-orange-500 to-red-500'
                      : logicScore > 70
                      ? 'bg-gradient-to-t from-green-400 to-blue-500'
                      : logicScore > 50
                      ? 'bg-gradient-to-t from-yellow-400 to-orange-500'
                      : 'bg-gradient-to-t from-red-500 to-red-700'
                    : 'bg-gray-700'
                }`}
                animate={{
                  scale: i < Math.floor(logicScore / 10) ? [1, 1.2, 1] : 1,
                  boxShadow: i < Math.floor(logicScore / 10) && logicScore > 90 
                    ? ['0 0 5px rgba(255,255,0,0.8)', '0 0 15px rgba(255,0,0,0.8)', '0 0 5px rgba(255,255,0,0.8)']
                    : 'none'
                }}
                transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
              />
            ))}
          </div>
        </div>

        {/* Combo Multiplier */}
        {comboMultiplier > 1 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-2 right-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-3 py-1"
          >
            <span className="text-yellow-400 font-black text-xs">
              🔥 COMBO x{comboMultiplier} 🔥
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* NUCLEAR Fallacy Detection System */}
      <motion.div 
        className="p-6 bg-gradient-to-br from-red-900/30 via-orange-900/30 to-yellow-900/30 backdrop-blur-xl border-2 border-red-500/50 rounded-3xl relative overflow-hidden"
        animate={{
          borderColor: detectedFallacies.length > 0 
            ? ['rgba(255,0,0,0.5)', 'rgba(255,255,0,0.8)', 'rgba(255,0,0,0.5)']
            : 'rgba(255,0,0,0.3)',
          boxShadow: detectedFallacies.length > 0
            ? [
                '0 0 20px rgba(255,0,0,0.5)',
                '0 0 40px rgba(255,255,0,0.8)',
                '0 0 20px rgba(255,0,0,0.5)'
              ]
            : '0 0 10px rgba(255,0,0,0.3)'
        }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="flex items-center gap-2 mb-6 text-red-400 font-mono text-xs tracking-widest uppercase">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Target size={16} />
          </motion.div>
          <span className="animate-pulse">💀 FALLACY ANNIHILATOR 💀</span>
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {Object.entries(fallacyCounts).length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 0.7 }} 
                className="text-center py-8"
              >
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🛡️
                </motion.div>
                <div className="text-green-400 text-lg font-black mb-2">
                  🔥 PERFECT DEFENSE! 🔥
                </div>
                <div className="text-xs text-gray-400 font-mono">
                  Your logic fortress is IMPENETRABLE!
                </div>
              </motion.div>
            ) : (
              Object.entries(fallacyCounts).map(([name, count], index) => (
                <motion.div
                  key={name}
                  layout
                  initial={{ x: -50, opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ scale: 0.5, opacity: 0, rotate: 180 }}
                  className="group relative"
                >
                  <motion.div
                    className="flex items-center justify-between p-4 rounded-xl bg-red-500/20 border-2 border-red-500/50 hover:bg-red-500/30 transition-all duration-200 relative overflow-hidden"
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(255,0,0,0.3)',
                        '0 0 20px rgba(255,255,0,0.6)',
                        '0 0 10px rgba(255,0,0,0.3)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {/* Explosion particles */}
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 5 }, (_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-lg"
                          animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            opacity: [1, 0],
                            scale: [0.5, 1.5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                          style={{
                            left: '50%',
                            top: '50%'
                          }}
                        >
                          {getRandomExplosion()}
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Skull size={20} className="text-red-400" />
                      </motion.div>
                      <span className="text-sm font-black text-red-200">{name}</span>
                    </div>
                    <div className="flex items-center gap-3 relative z-10">
                      <motion.span 
                        className="px-3 py-1 rounded-md bg-red-500/50 text-red-100 text-sm font-black font-mono"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        💀×{String(count)}💀
                      </motion.span>
                      <motion.div 
                        className="w-3 h-3 bg-red-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          boxShadow: [
                            '0 0 5px rgba(255,0,0,0.8)',
                            '0 0 15px rgba(255,255,0,0.8)',
                            '0 0 5px rgba(255,0,0,0.8)'
                          ]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* INSANE Total Violations */}
        <div className="mt-6 pt-4 border-t border-red-500/30">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <motion.span 
                className="text-4xl font-black text-red-400 block"
                animate={{ 
                  scale: detectedFallacies?.length > 0 ? [1, 1.3, 1] : 1,
                  textShadow: detectedFallacies?.length > 0 ? [
                    '0 0 10px rgba(255,0,0,0.8)',
                    '0 0 20px rgba(255,255,0,0.8)',
                    '0 0 10px rgba(255,0,0,0.8)'
                  ] : 'none'
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💀{detectedFallacies?.length || 0}💀
              </motion.span>
              <div className="text-[10px] text-gray-400 font-mono font-black">
                LOGIC_VIOLATIONS
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-300 font-bold">🧠 BRAIN BATTLES</div>
              <motion.div 
                className="text-2xl font-black text-purple-400"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⚔️{messages.length}⚔️
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* COSMIC Master Thinker Unlocks */}
      {logicScore >= 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="p-6 bg-gradient-to-br from-yellow-900/40 via-gold-900/40 to-orange-900/40 backdrop-blur-xl border-2 border-yellow-500/60 rounded-3xl relative overflow-hidden"
        >
          {/* Cosmic particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                animate={{
                  x: [0, Math.random() * 400 - 200],
                  y: [0, Math.random() * 400 - 200],
                  rotate: [0, 360],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                {['🌟', '💎', '👑', '🔥', '⚡', '🚀'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4 text-yellow-400 font-mono text-xs tracking-widest uppercase relative z-10">
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👑
            </motion.div>
            <span className="animate-pulse font-black">🌟 COSMIC OVERLORD ACTIVATED 🌟</span>
          </div>
          
          <div className="space-y-4 relative z-10">
            <div className="text-center">
              <motion.div 
                className="text-4xl font-black text-yellow-400 mb-2"
                animate={{ 
                  scale: [1, 1.1, 1],
                  textShadow: [
                    '0 0 20px rgba(255,255,0,0.8)',
                    '0 0 40px rgba(255,215,0,1)',
                    '0 0 20px rgba(255,255,0,0.8)'
                  ]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🚀 MULTIVERSE UNLOCKED 🚀
              </motion.div>
              <div className="text-sm text-yellow-300 font-bold">
                Reality bends to your intellectual will!
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              <motion.div 
                className="p-3 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(255,255,0,0.5)',
                    '0 0 25px rgba(255,215,0,0.8)',
                    '0 0 10px rgba(255,255,0,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-sm font-black text-yellow-300">🥊 DIMENSIONAL BATTLES</div>
                <div className="text-xs text-gray-300">Fight across parallel universes</div>
              </motion.div>
              
              <motion.div 
                className="p-3 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(255,255,0,0.5)',
                    '0 0 25px rgba(255,215,0,0.8)',
                    '0 0 10px rgba(255,255,0,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div className="text-sm font-black text-yellow-300">🧠 TIME TRAVEL LOGIC</div>
                <div className="text-xs text-gray-300">Debate your past and future selves</div>
              </motion.div>
              
              <motion.div 
                className="p-3 bg-yellow-500/20 border-2 border-yellow-500/50 rounded-xl"
                animate={{ 
                  boxShadow: [
                    '0 0 10px rgba(255,255,0,0.5)',
                    '0 0 25px rgba(255,215,0,0.8)',
                    '0 0 10px rgba(255,255,0,0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="text-sm font-black text-yellow-300">⚔️ REALITY WARFARE</div>
                <div className="text-xs text-gray-300">Reshape existence through pure logic</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* NUCLEAR Aha! Metric */}
      <motion.div 
        className="p-4 bg-gradient-to-br from-green-900/30 via-emerald-900/30 to-teal-900/30 backdrop-blur-xl border-2 border-green-500/50 rounded-2xl relative overflow-hidden"
        animate={{
          borderColor: [
            'rgba(0,255,0,0.5)',
            'rgba(0,255,255,0.8)',
            'rgba(0,255,0,0.5)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2 flex-1">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={16} className="text-green-400" />
            </motion.div>
            <span className="text-xs font-mono text-green-400 font-black">💡 AHA! NUCLEAR REACTOR 💡</span>
          </div>
          <div className="text-right ml-4">
            <motion.div 
              className="text-3xl font-black text-green-400 block"
              animate={{ 
                scale: [1, 1.3, 1],
                textShadow: [
                  '0 0 10px rgba(0,255,0,0.8)',
                  '0 0 20px rgba(0,255,255,0.8)',
                  '0 0 10px rgba(0,255,0,0.8)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ⚡{mindChanges}⚡
            </motion.div>
            <div className="text-[8px] text-gray-400 font-mono font-black whitespace-nowrap">MIND_EXPLOSIONS</div>
          </div>
        </div>

        {/* Mind explosion particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              animate={{
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25
              }}
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              💡
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}