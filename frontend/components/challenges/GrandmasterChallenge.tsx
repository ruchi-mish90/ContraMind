'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebateStore } from '../../store/useDebateStore';
import { Crown, Flame, Trophy, Skull, Sword, Shield, Zap, Target, Brain } from 'lucide-react';

interface ChallengeDay {
  day: number;
  title: string;
  description: string;
  completed: boolean;
  belief?: string;
  logicScore?: number;
  emoji: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'INSANE' | 'GODMODE';
}

export default function GrandmasterChallenge() {
  const { logicScore } = useDebateStore();
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [isExploding, setIsExploding] = useState(false);
  const [battleMode, setBattleMode] = useState(false);
  const [challengeDays, setChallengeDays] = useState<ChallengeDay[]>([
    {
      day: 1,
      title: 'FOUNDATION ANNIHILATION',
      description: 'State your strongest belief - prepare for TOTAL DESTRUCTION',
      completed: false,
      emoji: '💀',
      difficulty: 'EASY'
    },
    {
      day: 2,
      title: 'SOCRATIC NUCLEAR BOMB',
      description: 'Survive 10 minutes of PURE INTELLECTUAL WARFARE',
      completed: false,
      emoji: '💣',
      difficulty: 'MEDIUM'
    },
    {
      day: 3,
      title: 'NIETZSCHEAN HAMMER OF DOOM',
      description: 'Your values will be OBLITERATED by moral deconstruction',
      completed: false,
      emoji: '🔨',
      difficulty: 'HARD'
    },
    {
      day: 4,
      title: 'BUDDHIST EGO DISINTEGRATOR',
      description: 'Argue without ego while your IDENTITY MELTS AWAY',
      completed: false,
      emoji: '🧘‍♂️',
      difficulty: 'HARD'
    },
    {
      day: 5,
      title: 'MARXIST REALITY CRUSHER',
      description: 'Justify beliefs through material conditions or PERISH',
      completed: false,
      emoji: '⚒️',
      difficulty: 'INSANE'
    },
    {
      day: 6,
      title: 'MULTIVERSE BATTLE ROYALE',
      description: 'Face ALL PERSONAS SIMULTANEOUSLY in COSMIC WARFARE',
      completed: false,
      emoji: '🌌',
      difficulty: 'INSANE'
    },
    {
      day: 7,
      title: 'THE MIRROR OF ABSOLUTE TRUTH',
      description: 'DESTROY your Day 1 belief or be DESTROYED by it',
      completed: false,
      emoji: '🪞',
      difficulty: 'GODMODE'
    }
  ]);

  const [burnedBeliefs, setBurnedBeliefs] = useState<string[]>([]);
  const [cosmicPower, setCosmicPower] = useState(0);

  // Explosion effects
  useEffect(() => {
    if (logicScore >= 100) {
      setIsExploding(true);
      setBattleMode(true);
      setTimeout(() => setIsExploding(false), 3000);
    }
  }, [logicScore]);

  // Only show if user has reached Grandmaster level
  if (logicScore < 100) {
    return null;
  }

  const startChallenge = () => {
    setChallengeStarted(true);
    setCurrentDay(1);
    setCosmicPower(0);
  };

  const completeDay = (day: number, belief?: string, score?: number) => {
    setChallengeDays(prev => prev.map(d => 
      d.day === day 
        ? { ...d, completed: true, belief, logicScore: score }
        : d
    ));
    
    setCosmicPower(prev => prev + (day * 10));
    
    if (day < 7) {
      setCurrentDay(day + 1);
    } else {
      // Challenge completed - burn the belief
      if (challengeDays[0].belief) {
        setBurnedBeliefs(prev => [...prev, challengeDays[0].belief!]);
      }
    }
  };

  const getDayStatus = (day: ChallengeDay) => {
    if (day.completed) return 'completed';
    if (day.day === currentDay) return 'active';
    if (day.day < currentDay) return 'available';
    return 'locked';
  };

  const getStatusColor = (status: string, difficulty: string) => {
    if (status === 'completed') return 'text-green-400 border-green-500/70 bg-green-500/20';
    if (status === 'active') {
      switch (difficulty) {
        case 'GODMODE': return 'text-purple-400 border-purple-500/70 bg-purple-500/20';
        case 'INSANE': return 'text-red-400 border-red-500/70 bg-red-500/20';
        case 'HARD': return 'text-orange-400 border-orange-500/70 bg-orange-500/20';
        default: return 'text-yellow-400 border-yellow-500/70 bg-yellow-500/20';
      }
    }
    return 'text-gray-500 border-gray-600/50 bg-gray-700/10';
  };

  const getStatusIcon = (status: string, difficulty: string) => {
    if (status === 'completed') return '🏆';
    if (status === 'active') {
      switch (difficulty) {
        case 'GODMODE': return '👑';
        case 'INSANE': return '💀';
        case 'HARD': return '🔥';
        default: return '⚡';
      }
    }
    return '🔒';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'GODMODE': return 'text-purple-400 bg-purple-500/20 border-purple-500/50';
      case 'INSANE': return 'text-red-400 bg-red-500/20 border-red-500/50';
      case 'HARD': return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default: return 'text-green-400 bg-green-500/20 border-green-500/50';
    }
  };

  const getRandomExplosion = () => ['💥', '🔥', '⚡', '💀', '🌟', '💎', '🚀', '👑'][Math.floor(Math.random() * 8)];

  return (
    <div className="space-y-6 relative">
      {/* Cosmic Explosion Effects */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: [0, 3, 1], rotate: [0, 720, 1440] }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <div className="text-9xl animate-pulse">👑💥🌟💥👑</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INSANE Challenge Header */}
      <motion.div 
        className="p-6 bg-gradient-to-br from-purple-900/40 via-gold-900/40 to-red-900/40 backdrop-blur-xl border-2 border-yellow-500/60 rounded-3xl relative overflow-hidden"
        animate={{
          boxShadow: battleMode 
            ? [
                '0 0 30px rgba(255,215,0,0.8)',
                '0 0 60px rgba(255,0,255,0.8)',
                '0 0 30px rgba(255,215,0,0.8)'
              ]
            : '0 0 20px rgba(255,215,0,0.5)'
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* Cosmic Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              animate={{
                x: [0, Math.random() * 500 - 250],
                y: [0, Math.random() * 500 - 250],
                rotate: [0, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              {['👑', '💎', '🌟', '🔥', '⚡', '🚀', '💀', '⚔️'][Math.floor(Math.random() * 8)]}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-4 relative z-10">
          <motion.div
            animate={{ 
              rotate: 360, 
              scale: [1, 1.3, 1],
              filter: [
                'drop-shadow(0 0 10px rgba(255,215,0,0.8))',
                'drop-shadow(0 0 20px rgba(255,0,255,0.8))',
                'drop-shadow(0 0 10px rgba(255,215,0,0.8))'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown size={32} className="text-yellow-400" />
          </motion.div>
          <div>
            <motion.h2 
              className="text-2xl font-black text-yellow-400"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,215,0,0.8)',
                  '0 0 40px rgba(255,0,255,0.8)',
                  '0 0 20px rgba(255,215,0,0.8)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🚀 7-DAY COSMIC ANNIHILATION 🚀
            </motion.h2>
            <p className="text-sm text-gray-200 font-bold">Where beliefs go to DIE and legends are BORN!</p>
          </div>
        </div>

        {/* Cosmic Power Level */}
        {challengeStarted && (
          <div className="mb-4 relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-purple-400 font-mono font-black">🌌 COSMIC POWER LEVEL</span>
              <span className="text-xs text-yellow-400 font-black">{cosmicPower}/700</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-purple-500/50">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
                animate={{ 
                  width: `${(cosmicPower / 700) * 100}%`,
                  boxShadow: cosmicPower > 300 
                    ? [
                        '0 0 10px rgba(255,0,255,0.8)',
                        '0 0 20px rgba(255,255,0,0.8)',
                        '0 0 10px rgba(255,0,255,0.8)'
                      ]
                    : 'none'
                }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>
          </div>
        )}

        {!challengeStarted ? (
          <div className="space-y-4 relative z-10">
            <div className="text-sm text-gray-200 space-y-2">
              <motion.p 
                className="mb-2 font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🔥 <strong className="text-red-400">THE STAKES:</strong> Your soul will be INCINERATED in intellectual fire!
              </motion.p>
              <motion.p 
                className="mb-2 font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                ⚔️ <strong className="text-orange-400">THE RULES:</strong> NO MERCY. Logic Score below 80% = INSTANT DEATH!
              </motion.p>
              <motion.p 
                className="mb-2 font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🏆 <strong className="text-yellow-400">THE REWARD:</strong> COSMIC OVERLORD STATUS & Reality-Bending Powers!
              </motion.p>
            </div>
            
            <motion.button
              onClick={startChallenge}
              className="w-full py-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-black font-black text-lg rounded-xl relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255,0,0,0.8)',
                  '0 0 40px rgba(255,255,0,0.8)',
                  '0 0 20px rgba(255,0,0,0.8)'
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              🔥💀 ENTER THE COSMIC GAUNTLET 💀🔥
            </motion.button>
          </div>
        ) : (
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300 font-bold">🚀 ANNIHILATION PROGRESS</span>
              <span className="text-sm text-yellow-400 font-black">
                Day {currentDay}/7 💀
              </span>
            </div>
            
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-red-500/50">
              <motion.div
                className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
                animate={{ 
                  width: `${(challengeDays.filter(d => d.completed).length / 7) * 100}%`,
                  boxShadow: challengeDays.filter(d => d.completed).length > 3
                    ? [
                        '0 0 10px rgba(255,0,0,0.8)',
                        '0 0 20px rgba(255,255,0,0.8)',
                        '0 0 10px rgba(255,0,0,0.8)'
                      ]
                    : 'none'
                }}
                transition={{ type: 'spring', stiffness: 100 }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* INSANE Challenge Days */}
      {challengeStarted && (
        <div className="space-y-4">
          <AnimatePresence>
            {challengeDays.map((day, index) => {
              const status = getDayStatus(day);
              return (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -50, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  className={`p-5 rounded-2xl border-2 backdrop-blur-lg relative overflow-hidden ${getStatusColor(status, day.difficulty)}`}
                >
                  {/* Battle particles for active challenges */}
                  {status === 'active' && (
                    <div className="absolute inset-0 pointer-events-none">
                      {Array.from({ length: 10 }, (_, i) => (
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
                            delay: i * 0.2
                          }}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                          }}
                        >
                          {getRandomExplosion()}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <motion.span 
                        className="text-4xl"
                        animate={status === 'active' ? { 
                          scale: [1, 1.3, 1],
                          rotate: [0, 10, -10, 0]
                        } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        {day.emoji}{getStatusIcon(status, day.difficulty)}
                      </motion.span>
                      <div>
                        <h3 className="font-black text-lg">
                          Day {day.day}: {day.title}
                        </h3>
                        <p className="text-sm opacity-90 font-medium">{day.description}</p>
                        <div className={`inline-block px-2 py-1 rounded-md text-xs font-black border mt-2 ${getDifficultyColor(day.difficulty)}`}>
                          {day.difficulty} MODE
                        </div>
                      </div>
                    </div>
                    
                    {status === 'active' && (
                      <motion.button
                        onClick={() => {
                          completeDay(day.day, 'Sample belief', logicScore);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-sm font-black relative overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(255,0,0,0.8)',
                            '0 0 20px rgba(255,165,0,0.8)',
                            '0 0 10px rgba(255,0,0,0.8)'
                          ]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        💀 ENTER BATTLE 💀
                      </motion.button>
                    )}
                    
                    {day.completed && day.logicScore && (
                      <div className="text-right">
                        <motion.div 
                          className="text-lg font-black text-green-400"
                          animate={{
                            textShadow: [
                              '0 0 10px rgba(0,255,0,0.8)',
                              '0 0 20px rgba(0,255,255,0.8)',
                              '0 0 10px rgba(0,255,0,0.8)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🏆 {day.logicScore}% 🏆
                        </motion.div>
                        <div className="text-xs text-gray-300 font-bold">VICTORY ACHIEVED</div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* NUCLEAR Burned Beliefs Vault */}
      {burnedBeliefs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="p-6 bg-gradient-to-br from-red-900/40 via-orange-900/40 to-black/40 backdrop-blur-xl border-2 border-red-500/60 rounded-3xl relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame size={24} className="text-red-400" />
            </motion.div>
            <h3 className="text-xl font-black text-red-400">💀 INCINERATED BELIEFS GRAVEYARD 💀</h3>
          </div>
          
          <div className="space-y-3">
            {burnedBeliefs.map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                className="p-4 bg-red-500/20 border-2 border-red-500/50 rounded-xl relative overflow-hidden"
              >
                <div className="text-sm text-red-200 line-through opacity-75 font-bold">
                  💀 "{belief}" 💀
                </div>
                <div className="text-xs text-gray-300 mt-2 font-bold">
                  ⚰️ INTELLECTUALLY ANNIHILATED on Day 7 ⚰️
                </div>
                
                {/* Burning effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-lg"
                      animate={{
                        y: [0, -30],
                        opacity: [1, 0],
                        scale: [0.5, 1.2]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      style={{
                        left: `${20 + i * 15}%`,
                        bottom: '0'
                      }}
                    >
                      🔥
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* COSMIC OVERLORD Achievement */}
      {challengeDays.every(d => d.completed) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.3, rotate: -360 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="p-8 bg-gradient-to-br from-purple-900/50 via-gold-900/50 to-blue-900/50 backdrop-blur-xl border-2 border-purple-500/70 rounded-3xl relative overflow-hidden"
        >
          {/* Victory particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-3xl"
                animate={{
                  x: [0, Math.random() * 600 - 300],
                  y: [0, Math.random() * 600 - 300],
                  rotate: [0, 720],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              >
                {['👑', '🌟', '💎', '🚀', '⚡', '🔥'][Math.floor(Math.random() * 6)]}
              </motion.div>
            ))}
          </div>

          <div className="text-center space-y-6 relative z-10">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Trophy size={80} className="text-yellow-400 mx-auto" />
            </motion.div>
            
            <motion.h3 
              className="text-4xl font-black text-yellow-400"
              animate={{
                textShadow: [
                  '0 0 30px rgba(255,215,0,0.8)',
                  '0 0 60px rgba(255,0,255,0.8)',
                  '0 0 30px rgba(255,215,0,0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              👑 COSMIC OVERLORD ACHIEVED 👑
            </motion.h3>
            
            <p className="text-lg text-gray-200 font-bold">
              🚀 Your cognitive portrait is being forged in the fires of PURE LOGIC... 🚀
            </p>
            
            <motion.div 
              className="w-40 h-40 mx-auto bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 rounded-2xl flex items-center justify-center relative overflow-hidden"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(255,0,255,0.8)',
                  '0 0 60px rgba(255,255,0,0.8)',
                  '0 0 30px rgba(255,0,255,0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-6xl">🧠</span>
              
              {/* Portrait particles */}
              <div className="absolute inset-0">
                {Array.from({ length: 20 }, (_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    animate={{
                      x: [0, Math.random() * 160 - 80],
                      y: [0, Math.random() * 160 - 80],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                    style={{
                      left: '50%',
                      top: '50%'
                    }}
                  />
                ))}
              </div>
            </motion.div>
            
            <motion.p 
              className="text-sm text-gray-300 font-bold italic"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💀 "A mind that has transcended reality, conquered logic, and ANNIHILATED all false beliefs through PURE INTELLECTUAL WARFARE." 💀
            </motion.p>
          </div>
        </motion.div>
      )}
    </div>
  );
}