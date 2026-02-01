import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = (process.env.NEXT_PUBLIC_GEMINI_API_KEY || "").trim();
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { goal, level, hoursPerDay, languages, focusAreas } = body;

    if (!goal || !level) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // UPDATED PROMPT: Forces AI/ML focus even if C++ is selected
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
         - If the user wants "AI/ML" but selected "C++", teach AI concepts using C++ libraries (like TensorFlow C++ or PyTorch C++) OR explicitly suggest Python for the AI parts.
         - Do NOT just generate a generic language guide.
      
      2. Return ONLY valid JSON.
      3. For 'search_query', provide the specific search term a user should type into Google/YouTube to find the best resource (e.g., "GeeksforGeeks C++ Vectors" or "Andrew Ng Machine Learning").

      JSON Structure:
      {
        "roadmapTitle": "String (e.g., 'AI/ML Mastery with C++')",
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

    // Smart Fallback 
    const modelsToTry = ["gemini-1.5-pro", "gemini-pro", "gemini-flash-latest"];
    let jsonResponse = null;
    let lastError = null;

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        jsonResponse = JSON.parse(cleanedText);
        break; 
      } catch (e: any) {
        console.warn(`Failed with ${modelName}`, e.message);
        lastError = e;
      }
    }

    if (!jsonResponse) throw lastError || new Error("All models failed.");

    return NextResponse.json(jsonResponse);

  } catch (error: any) {
    console.error("AI Fatal Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}