// Mock AI Responses for Demo Mode - The Cognitive Gym Experience
import type { SocraticResponse } from '../../frontend/types/index';

export const generateMockResponse = (userMessage: string): SocraticResponse => {
  const mockResponses = [
    {
      score: Math.floor(Math.random() * 20) + 60, // 60-79
      fallacy: 'Ad Hominem',
      question: `🎯 STEEL-MAN: You're arguing that "${userMessage}" represents a fundamental truth about how the world operates - and I'll grant that this perspective has compelling surface logic.

📊 LOGIC SCORE: 65
🚨 FALLACY ALERT: Ad Hominem (attacking the person rather than the argument)
🔍 SOCRATIC PROBE: But here's where your reasoning fractures: if this principle were universally true, wouldn't every person who follows it achieve identical outcomes? What about the countless counterexamples we observe daily? Are you conflating correlation with causation, or are you defining success in a way that conveniently supports your premise?
🧠 CONVICTION HEATMAP: Strong emotional attachment detected, weak empirical foundation`
    },
    {
      score: Math.floor(Math.random() * 15) + 70, // 70-84
      fallacy: 'Hasty Generalization', 
      question: `🎯 STEEL-MAN: Your position that "${userMessage}" is actually more sophisticated than you initially presented - you're identifying a pattern that seems to hold across multiple domains, which shows systematic thinking.

📊 LOGIC SCORE: 76
🚨 FALLACY ALERT: Hasty Generalization (broad claim from limited evidence)
🔍 SOCRATIC PROBE: Now let me surgically dismantle this: you're extrapolating from a narrow sample size to make universal claims. Can you define exactly what you mean by your key terms? More crucially - what would constitute evidence that could potentially falsify your belief? If you can't answer that, you're not holding a belief, you're clutching a prejudice.
🧠 CONVICTION HEATMAP: Moderate logical structure, vulnerable to definitional challenges`
    },
    {
      score: Math.floor(Math.random() * 25) + 55, // 55-79
      fallacy: 'False Dichotomy',
      question: `🎯 STEEL-MAN: I'll strengthen your argument: "${userMessage}" represents a binary choice that forces clarity and eliminates the wishy-washy middle ground that weakens most decision-making.

📊 LOGIC SCORE: 58
🚨 FALLACY ALERT: False Dichotomy (presenting only two options when more exist)
🔍 SOCRATIC PROBE: But here's your logical trap: you've constructed a false binary. Reality rarely offers such clean either/or choices. What middle ground are you systematically ignoring? What third, fourth, or fifth alternatives exist that you're not considering? Why must it be one extreme or the other when the most elegant solutions often lie in the synthesis?
🧠 CONVICTION HEATMAP: High certainty masking low complexity tolerance`
    },
    {
      score: Math.floor(Math.random() * 20) + 65, // 65-84
      fallacy: 'Circular Reasoning',
      question: `🎯 STEEL-MAN: Your argument about "${userMessage}" actually contains a sophisticated recursive logic - you're building a self-reinforcing system that has internal consistency.

📊 LOGIC SCORE: 72
🚨 FALLACY ALERT: Circular Reasoning (using conclusion to support premise)
🔍 SOCRATIC PROBE: Now watch me expose the circularity: you're using your conclusion to support your premise. Can you trace the logical chain of your argument without referring back to your starting assumption? Where does the reasoning actually BEGIN, and how do you avoid simply restating your initial belief in different words? Break the circle or admit you're trapped in it.
🧠 CONVICTION HEATMAP: Strong internal logic, weak foundational support`
    },
    {
      score: Math.floor(Math.random() * 15) + 75, // 75-89
      fallacy: 'None',
      question: `🎯 STEEL-MAN: Your position on "${userMessage}" demonstrates sophisticated thinking - you've considered multiple variables and shown awareness of complexity. This is actually stronger reasoning than most people achieve.

📊 LOGIC SCORE: 82
🚨 FALLACY ALERT: None (solid logical structure)
🔍 SOCRATIC PROBE: Since your logic is structurally sound, let's stress-test the foundations: what underlying assumptions are you making that you haven't examined? If we were to examine this belief from the perspective of someone who completely disagrees with you, what would be their strongest counterargument? Can you argue against yourself better than I can argue against you?
🧠 CONVICTION HEATMAP: Strong reasoning, ready for advanced challenges`
    }
  ];

  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
};

export const formatSocraticResponse = (response: SocraticResponse): string => {
  return response.question; // The question already contains the full formatted response
};