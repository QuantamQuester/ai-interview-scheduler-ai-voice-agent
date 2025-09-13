import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { jobPosition, jobDescription, duration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
      .replace("{{jobTitle}}", jobPosition)
      .replace("{{jobDescription}}", jobDescription)
      .replace("{{duration}}", duration)
      .replace("{{type}}", type);

    console.log("Final Prompt:", FINAL_PROMPT);

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini", // or gemini if you prefer
      messages: [
        {
          role: "system",
          content:
            "You are an AI that generates interview questions. Respond ONLY with valid JSON. Do NOT include ```json fences or extra text.",
        },
        { role: "user", content: FINAL_PROMPT },
      ],
      temperature: 0,
    });

    const aiResponse = completion.choices[0].message?.content?.trim() || "";

    let parsed;
    try {
      parsed = JSON.parse(aiResponse); // validate JSON
    } catch (err) {
      console.error("❌ AI returned invalid JSON:", aiResponse);
      return NextResponse.json(
        { success: false, error: "AI did not return valid JSON" },
        { status: 500 }
      );
    }

    // ✅ Send clean JSON only
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
