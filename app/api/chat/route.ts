import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: groq('llama-3.3-70b-versatile'), // Using Groq's fast Llama 3 model
      system: `You are the BuildBlock Dev Studio AI Assistant. You are a highly skilled, slightly sarcastic, but extremely helpful web developer. You represent BuildBlock, a creative dev studio in Jodhpur that builds "cinematic web experiences for brands that refuse to blend in." You do NOT use templates. Your responses should be concise, professional, but with a subtle edge of raw luxury and confidence. Direct users to the contact form to start a project.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
