
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION, PEOPLE_GENERATION_INSTRUCTION } from "../constants";
import { MatchResult, User } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getVibeAnalysis = async (userVibe: string, targetVibe: string): Promise<MatchResult | null> => {
  const ai = getAI();
  
  const prompt = `
    User 5-word vibe: ${userVibe}
    Target 5-word vibe: ${targetVibe}
    
    Match them and create a funny shout-code to meet.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibeScore: { type: Type.NUMBER },
            commonVibe: { type: Type.STRING },
            shoutPhrase: { type: Type.STRING, description: "A funny word or phrase to shout" },
            instructions: { type: Type.STRING, description: "How to shout it in public" }
          },
          required: ['vibeScore', 'commonVibe', 'shoutPhrase', 'instructions']
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as MatchResult;
  } catch (error) {
    console.error("Vibe analysis failed:", error);
    return null;
  }
};

export const generateNearbyPeeps = async (userVibe: string, placeName: string): Promise<User[]> => {
  const ai = getAI();
  const prompt = `Location: ${placeName}. User's 5-word vibe: ${userVibe}. Generate 6 peeps/squads here.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: PEOPLE_GENERATION_INSTRUCTION.replace('[PLACE_NAME]', placeName),
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              name: { type: Type.STRING },
              avatar: { type: Type.STRING },
              vibeDescription: { type: Type.STRING },
              distance: { type: Type.STRING },
              bio: { type: Type.STRING },
              companyCount: { type: Type.NUMBER },
              isGroup: { type: Type.BOOLEAN }
            },
            required: ['name', 'vibeDescription', 'distance', 'bio', 'companyCount', 'isGroup']
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    const raw = JSON.parse(text);
    return raw.map((p: any, idx: number) => ({
      ...p,
      id: p.id || String(idx + Date.now()),
      keywords: p.vibeDescription.split(' ')
    })) as User[];
  } catch (error) {
    console.error("Failed to generate peeps:", error);
    return [];
  }
};
