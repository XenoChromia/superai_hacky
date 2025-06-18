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

    try {
    // Forward it to another server
    const res = await fetch("http://172.16.7.179:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(aiResponse),
    });

    const data = await res.json();

    return NextResponse.json({ data });
  } catch (e) {
    console.error(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }    
  } catch (error) {
    console.error('AI API Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' }, 
      { status: 500 }
    );
  }
}
