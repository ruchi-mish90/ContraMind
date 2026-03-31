import { createGroqClient } from '../../../backend/lib/groq';
import { SOCRATIC_SYSTEM_PROMPT, PERSONA_PROMPTS } from '../../../backend/prompts/socraticEngine';
import { CognitiveForensics } from '../../../backend/lib/pressure-gauge';

/**
 * @file route.ts
 * @description Production-grade Edge route for the ContraMind Dialectic Engine.
 * Orchestrates Sentiment Forensics, Pressure Scaling, and Persona Emulation.
 */

export const runtime = 'edge';

// Standard response headers for Vercel AI Data Stream
const RESPONSE_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  'X-Vercel-AI-Data-Stream': 'v1',
};

export async function POST(req: Request) {
  try {
    const { messages, personaId, stage, logicScore: currentScore } = await req.json();
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || "";

    // 1. RUN COGNITIVE FORENSICS
    // We analyze the user's input before hitting the AI to determine the "Aggression Directive"
    const forensics = CognitiveForensics.analyze(lastUserMessage, currentScore || 70);
    const directives = CognitiveForensics.getDirectives(forensics, currentScore || 70);
    const forensicOverlay = CognitiveForensics.formatForAI(directives, forensics);

    // 2. CONSTRUCT ARCHITECTURAL PROMPT
    // Combine the core engine logic + Persona methodology + Real-time forensics
    const personaPrompt = PERSONA_PROMPTS[personaId as keyof typeof PERSONA_PROMPTS] || "";
    const systemInstruction = `
      ${SOCRATIC_SYSTEM_PROMPT}
      
      [CURRENT METHODOLOGY: ${personaId.toUpperCase()}]
      ${personaPrompt}

      [DIALECTIC STAGE: ${stage}]
      [INTELLECTUAL PRESSURE: ${directives.aggressionStance}]
      
      ${forensicOverlay}
      
      INSTRUCTION: If an intervention is triggered in the overlay above, 
      prioritize the deconstruction of the user's hubris or emotional drift 
      using your specific methodology.
    `;

    // 3. EXECUTE DIALECTIC LINK (Groq / AI Call)
    const groqClient = createGroqClient();
    
    // Fallback logic if AI is unavailable (Professional Mock)
    if (!groqClient) {
      return handleMockFallback(lastUserMessage, personaId, stage);
    }

    const completion = await groqClient.createChatCompletion({
      messages: [
        { role: 'system', content: systemInstruction },
        ...messages.map((m: any) => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const aiContent = completion.choices[0]?.message?.content || "";

    // 4. METADATA EXTRACTION
    // We extract the score and fallacies from the AI's structured response
    const scoreMatch = aiContent.match(/INTEGRITY SCORE:\s*(\d+)/i);
    const extractedScore = scoreMatch ? parseInt(scoreMatch[1]) : currentScore;
    
    const fallacyMatch = aiContent.match(/FALLACY DETECTION:\s*(.*)/i);
    const extractedFallacies = fallacyMatch 
      ? fallacyMatch[1].split(',').map((f: string) => f.trim()).filter((f: string) => f.toLowerCase() !== 'none') 
      : [];

    // 5. STREAM RESPONSE
    // We return the content in the Vercel stream format, including metadata for the Store
    const payload = JSON.stringify({
      text: aiContent,
      scoreAdjustment: (extractedScore || 70) - (currentScore || 70),
      fallacies: extractedFallacies,
      pressureIndex: directives.pressureIndex
    });

    return new Response(`0:${payload}\n`, { headers: RESPONSE_HEADERS });

  } catch (error: any) {
    console.error('ContraMind Engine Error:', error);
    return handleEmergencyProtocol(error);
  }
}

/**
 * Handles professional-grade mock responses for demo modes or API failures.
 */
function handleMockFallback(input: string, persona: string, stage: string) {
  const mockContent = `
### 🎯 THE STEEL-MAN
Your assertion regarding "${input}" hinges on the foundational premise that structural integrity is a byproduct of individual agency. It is a sophisticated, if traditional, defense of the status quo.

### 🚨 LOGICAL FORENSICS
- **INTEGRITY SCORE:** 68
- **FALLACY DETECTION:** Appeal to Tradition
- **CRITICAL VULNERABILITY:** The assumption of agency in a deterministic system.

### 🔍 THE ADVERSARIAL PROBE
Does your belief in "${input}" survive if we remove the convenience of your own class interests from the equation?

### 🧠 COGNITIVE MAP
Mid-level Axiomatic Rigidity.
  `;

  const payload = JSON.stringify({
    text: mockContent.trim(),
    scoreAdjustment: -2,
    fallacies: ['Appeal to Tradition'],
    pressureIndex: 45
  });

  return new Response(`0:${payload}\n`, { headers: RESPONSE_HEADERS });
}

/**
 * Final safety net to ensure the UI never "hangs" on a 500 error.
 */
function handleEmergencyProtocol(error: any) {
  const content = `[DIALECTIC LINK SEVERED] \n\n Your logic has created a system overflow. Perhaps it is a sign that your premises are too chaotic for standard computation. Re-state your first principles.`;
  const payload = JSON.stringify({ text: content, scoreAdjustment: 0, fallacies: [], pressureIndex: 100 });
  return new Response(`0:${payload}\n`, { headers: RESPONSE_HEADERS });
}