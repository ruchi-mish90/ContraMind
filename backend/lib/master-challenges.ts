// 7-Day Master Thinker Challenge System
export interface MasterChallenge {
  day: number;
  title: string;
  description: string;
  beliefPrompt: string;
  difficulty: 'Grandmaster' | 'Legendary' | 'Mythical';
  requiredScore: number;
  reward: string;
}

export const SEVEN_DAY_CHALLENGE: MasterChallenge[] = [
  {
    day: 1,
    title: 'The Foundation Shaker',
    description: 'Challenge your most fundamental belief about reality',
    beliefPrompt: 'What is your most unshakeable belief about how the world works?',
    difficulty: 'Grandmaster',
    requiredScore: 95,
    reward: 'Unlock: Reality Questioner Badge'
  },
  {
    day: 2,
    title: 'The Moral Maze',
    description: 'Navigate the complexities of ethical reasoning',
    beliefPrompt: 'What moral principle do you consider absolutely universal?',
    difficulty: 'Grandmaster',
    requiredScore: 95,
    reward: 'Unlock: Ethics Master Badge'
  },
  {
    day: 3,
    title: 'The Identity Crisis',
    description: 'Question the very nature of self and identity',
    beliefPrompt: 'What makes you "you" - what is the core of your identity?',
    difficulty: 'Legendary',
    requiredScore: 98,
    reward: 'Unlock: Self-Questioner Badge'
  },
  {
    day: 4,
    title: 'The Purpose Paradox',
    description: 'Examine the meaning and purpose of existence',
    beliefPrompt: 'What do you believe is the ultimate purpose of human existence?',
    difficulty: 'Legendary',
    requiredScore: 98,
    reward: 'Unlock: Existential Explorer Badge'
  },
  {
    day: 5,
    title: 'The Knowledge Trap',
    description: 'Question the very nature of knowledge and truth',
    beliefPrompt: 'How do you know that what you know is actually true?',
    difficulty: 'Legendary',
    requiredScore: 99,
    reward: 'Unlock: Epistemology Master Badge'
  },
  {
    day: 6,
    title: 'The Free Will Paradox',
    description: 'Confront the illusion of choice and control',
    beliefPrompt: 'Do you believe you have free will, and how would you prove it?',
    difficulty: 'Mythical',
    requiredScore: 100,
    reward: 'Unlock: Determinism Destroyer Badge'
  },
  {
    day: 7,
    title: 'The Ultimate Question',
    description: 'Face the final philosophical challenge',
    beliefPrompt: 'If you could know one absolute truth about existence, what would you want it to be?',
    difficulty: 'Mythical',
    requiredScore: 100,
    reward: 'Unlock: COGNITIVE GRANDMASTER SUPREME'
  }
];

export const getMasterChallengeForDay = (day: number): MasterChallenge | null => {
  return SEVEN_DAY_CHALLENGE.find(challenge => challenge.day === day) || null;
};

export const getCompletedChallenges = (userScores: number[]): number => {
  return userScores.filter(score => score >= 95).length;
};

export const getNextMasterChallenge = (completedDays: number): MasterChallenge | null => {
  if (completedDays >= 7) return null;
  return SEVEN_DAY_CHALLENGE[completedDays];
};