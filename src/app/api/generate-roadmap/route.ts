import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// 1. Initialize API (Works with both old and new variable names)
const apiKey = (process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").trim();
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { goal, level, hoursPerDay, languages, focusAreas } = body;

    // 2. The Model Name (The Critical Fix)
    // Your logs proved you have access to 'gemini-flash-latest'.
    // We use this exact name to match yesterday's setup but with the valid model.
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `
      Act as a Senior Tech Mentor. Create a detailed learning roadmap.
      
      User Profile:
      - Target Goal: ${goal}
      - Focus Area: ${focusAreas.join(", ")} (THIS IS THE PRIORITY)
      - Preferred Language: ${languages.join(", ")}
      - Level: ${level}
      - Time: ${hoursPerDay} hrs/day

      **CRITICAL INSTRUCTIONS:**
      1. PRIORITIZE the 'Focus Area' (${focusAreas.join(", ")}) over the 'Language'. 
      2. Return ONLY valid JSON.
      3. For 'search_query', provide specific search terms.

      JSON Structure:
      {
        "roadmapTitle": "String",
        "summary": "String",
        "phases": [
          {
            "phaseTitle": "String",
            "duration": "String",
            "topics": [
              {
                "topicName": "String",
                "search_query": "String" 
              }
            ]
          }
        ]
      }
    `;

    // 3. Generate (Simple & Clean like yesterday)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 4. Parse
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonResponse = JSON.parse(cleanedText);

    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate roadmap" }, { status: 500 });
  }
}