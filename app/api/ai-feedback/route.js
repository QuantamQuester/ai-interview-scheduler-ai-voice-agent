import { FEEDBACK_PROMPT } from "@/services/Constants"; // create a constant similar to QUESTIONS_PROMPT
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const {conversation}=await req.json();
    const FINAL_PROMPT=FEEDBACK_PROMPT.replace('{{conversation}}',JSON.stringify(conversation));

    console.log("Final Feedback Prompt:", FINAL_PROMPT);

    // Initialize OpenAI with API key
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates interview feedback. Respond ONLY with valid JSON. Do NOT include ```json fences or extra text.",
        },
        { role: "user", content: FINAL_PROMPT },
      ],
      temperature: 0,
    });

    const aiResponse = completion.choices[0].message?.content?.trim() || "";

    // Safely parse AI JSON response
    let parsedFeedback = {};
    if (aiResponse) {
      try {
        parsedFeedback = JSON.parse(aiResponse);
      } catch (err) {
        console.error("❌ AI returned invalid JSON:", aiResponse);
        return NextResponse.json(
          { success: false, error: "AI did not return valid JSON" },
          { status: 500 }
        );
      }
    } 

    // Return clean JSON feedback
    return NextResponse.json(parsedFeedback);
  } catch (error) {
    console.error("AI Feedback API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
