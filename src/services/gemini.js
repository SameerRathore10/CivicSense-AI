import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const analyzeIssue = async (imageUrl) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      contents: `
You are an AI Civic Issue Detection System.

Analyze the civic issue image carefully.

Classify issueType using ONLY one of these values:

- Pothole
- Road Damage
- Garbage Overflow
- Illegal Dumping
- Water Leakage
- Drainage Problem
- Streetlight Failure
- Fallen Tree
- Road Obstruction
- Public Property Damage
- Other

Severity must be ONLY:
- Low
- Medium
- High

Priority must be ONLY:
- Normal
- Important
- Urgent

Department must be ONLY:
- Roads Department
- Sanitation Department
- Water Department
- Electricity Department
- Parks Department
- Public Works Department

Image URL:
${imageUrl}

Return ONLY valid JSON:

{
  "issueType": "",
  "severity": "",
  "priority": "",
  "confidence": "",
  "department": "",
  "description": ""
}
`,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
