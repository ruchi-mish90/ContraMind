// Real-time Biometrics & Pressure Gauge System
export interface SentimentAnalysis {
  confidence: number; // 0-100
  aggression: number; // 0-100
  certainty: number; // 0-100
  emotionalWords: string[];
  pressureLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export interface PressureGauge {
  pressure: number;
  shouldInterrupt: boolean;
  interruptionReason: string;
  aggressionLevel: 'PASSIVE' | 'ASSERTIVE' | 'AGGRESSIVE' | 'RUTHLESS';
}

// Confidence indicators in text
const CONFIDENCE_INDICATORS = [
  'obviously', 'clearly', 'definitely', 'absolutely', 'certainly',
  'without doubt', 'undoubtedly', 'surely', 'of course', 'naturally',
  'everyone knows', 'it\'s obvious', 'no question', 'guaranteed'
];

const AGGRESSIVE_WORDS = [
  'wrong', 'stupid', 'ridiculous', 'nonsense', 'idiotic',
  'absurd', 'insane', 'crazy', 'foolish', 'moronic'
];

const EMOTIONAL_WORDS = [
  'love', 'hate', 'angry', 'furious', 'passionate', 'disgusted',
  'outraged', 'thrilled', 'devastated', 'ecstatic', 'terrified'
];

export const analyzeSentiment = (message: string): SentimentAnalysis => {
  const words = message.toLowerCase().split(/\s+/);
  const totalWords = words.length;
  
  // Calculate confidence level
  const confidenceWords = CONFIDENCE_INDICATORS.filter(indicator => 
    message.toLowerCase().includes(indicator)
  );
  const confidence = Math.min(100, (confidenceWords.length / totalWords) * 500);
  
  // Calculate aggression level
  const aggressiveWords = AGGRESSIVE_WORDS.filter(word => 
    words.includes(word)
  );
  const aggression = Math.min(100, (aggressiveWords.length / totalWords) * 300);
  
  // Calculate certainty (exclamation marks, caps, absolute statements)
  const exclamations = (message.match(/!/g) || []).length;
  const capsWords = words.filter(word => word === word.toUpperCase() && word.length > 2);
  const certainty = Math.min(100, ((exclamations + capsWords.length) / totalWords) * 200);
  
  // Find emotional words
  const emotionalWords = EMOTIONAL_WORDS.filter(word => words.includes(word));
  
  // Calculate pressure level
  const averageIntensity = (confidence + aggression + certainty) / 3;
  let pressureLevel: SentimentAnalysis['pressureLevel'] = 'LOW';
  
  if (averageIntensity > 75) pressureLevel = 'CRITICAL';
  else if (averageIntensity > 50) pressureLevel = 'HIGH';
  else if (averageIntensity > 25) pressureLevel = 'MEDIUM';
  
  return {
    confidence,
    aggression,
    certainty,
    emotionalWords,
    pressureLevel
  };
};

export const calculatePressureGauge = (
  sentiment: SentimentAnalysis, 
  logicScore: number
): PressureGauge => {
  // Pressure = User_Confidence / Logic_Score
  const pressure = logicScore > 0 ? sentiment.confidence / logicScore : 0;
  
  // Determine if we should interrupt (Pressure > 1.5)
  const shouldInterrupt = pressure > 1.5;
  
  let interruptionReason = '';
  let aggressionLevel: PressureGauge['aggressionLevel'] = 'PASSIVE';
  
  if (shouldInterrupt) {
    if (sentiment.confidence > 80 && logicScore < 60) {
      interruptionReason = 'OVERCONFIDENCE_DETECTED';
      aggressionLevel = 'RUTHLESS';
    } else if (sentiment.aggression > 60) {
      interruptionReason = 'EMOTIONAL_REASONING';
      aggressionLevel = 'AGGRESSIVE';
    } else if (sentiment.certainty > 70 && logicScore < 70) {
      interruptionReason = 'FALSE_CERTAINTY';
      aggressionLevel = 'ASSERTIVE';
    }
  } else {
    // Adjust aggression based on overall performance
    if (logicScore > 85) aggressionLevel = 'ASSERTIVE';
    else if (logicScore > 70) aggressionLevel = 'PASSIVE';
    else aggressionLevel = 'AGGRESSIVE';
  }
  
  return {
    pressure,
    shouldInterrupt,
    interruptionReason,
    aggressionLevel
  };
};

export const generateInterruption = (reason: string, sentiment: SentimentAnalysis): string => {
  const interruptions = {
    OVERCONFIDENCE_DETECTED: [
      "🚨 INTERRUPTION: Your confidence level is inversely proportional to your logic score. Why are you so certain about something you can't properly defend?",
      "⚡ HALT: You're speaking with 80% confidence but 40% logic. What's driving this overconfidence?",
      "🔥 STOP: I detect dangerous levels of certainty paired with weak reasoning. Explain this contradiction."
    ],
    EMOTIONAL_REASONING: [
      "🚨 INTERRUPTION: You're using emotional language instead of logical arguments. Are you debating or venting?",
      "⚡ HALT: Your aggression suggests you're defending identity, not ideas. What are you really protecting?",
      "🔥 STOP: Emotional intensity detected. Can you make this argument without the emotional charge?"
    ],
    FALSE_CERTAINTY: [
      "🚨 INTERRUPTION: You're expressing certainty about uncertain things. What's the source of this false confidence?",
      "⚡ HALT: High certainty, low logic score. Are you confusing conviction with correctness?",
      "🔥 STOP: Your certainty exceeds your reasoning ability. Justify this confidence level."
    ]
  };
  
  const options = interruptions[reason as keyof typeof interruptions] || interruptions.OVERCONFIDENCE_DETECTED;
  return options[Math.floor(Math.random() * options.length)];
};