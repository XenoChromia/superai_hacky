import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'edge'; // Use edge runtime for faster responses

export async function POST(request: NextRequest) {
  try {
    const { userMessage, systemInstructions } = await request.json();
    
    // Initialize SambaNova client
    const client = new OpenAI({
      baseURL: "https://api.sambanova.ai/v1",
      apiKey: process.env.SAMBASTUDIO_API_KEY, // Use environment variable
    });

    const completion = await client.chat.completions.create({
      model: "Meta-Llama-3.3-70B-Instruct",
      messages: [
        { role: "system", content: systemInstructions },
        { role: "user", content: userMessage }
      ],
      max_tokens: 256,
      temperature: 0.1
    });

    const aiResponse = completion.choices[0]?.message.content || "I'm sorry, I couldn't process that request.";
    
    return NextResponse.json({ aiResponse });
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' }, 
      { status: 500 }
    );
  }
}