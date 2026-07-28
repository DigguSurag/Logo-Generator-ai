import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function AIDesignIdea(userPrompt) {

  try {

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",

      contents: `
Generate 5 creative logo ideas.

Prompt:
${userPrompt}

Return ONLY valid JSON in this format:

{
  "ideas": [
    "idea 1",
    "idea 2",
    "idea 3"
  ]
}
      `,
    });

    const text =
      typeof response.text === "function"
        ? response.text()
        : response.text;

    console.log(text);

    return JSON.parse(text);

  } catch (error) {

    console.log("GEMINI ERROR:", error);

    throw error;
  }
}