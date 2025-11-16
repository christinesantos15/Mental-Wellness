
import { GoogleGenAI, Type } from '@google/genai';
import { PositivityContent, SelfCareTask } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const positivitySchema = {
  type: Type.OBJECT,
  properties: {
    spirit: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Title for spiritual fuel, e.g. 'Fuel Your Spirit'" },
        body: { type: Type.STRING, description: "A short, inspirational quote." },
      },
    },
    brighten: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Title for daily tips, e.g. 'Brighten Your Day'" },
        items: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Three simple, actionable tips to have a better day.",
        },
      },
    },
    comfort: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING, description: "Title for comforting words, e.g. 'Words of Comfort'" },
        body: { type: Type.STRING, description: "A comforting or hopeful quote, potentially from a religious text or famous author." },
      },
    },
  },
};

const selfCareSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            title: { type: Type.STRING, description: "The name of the self-care task, e.g., 'Mindful Breathing'." },
            description: { type: Type.STRING, description: "A short, one-sentence description of how to perform the task." },
        },
    },
};

export const getPositivityBoost = async (): Promise<PositivityContent> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a daily boost of positivity with one spiritual quote, three tips to brighten the day, and one comforting quote. Format the response according to the provided schema.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: positivitySchema,
      },
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as PositivityContent;
  } catch (error) {
    console.error("Error fetching positivity boost:", error);
    throw new Error("Failed to get positivity boost from Gemini API.");
  }
};

export const getSelfCareTasks = async (): Promise<SelfCareTask[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Generate a list of three simple, actionable self-care tasks for someone feeling down. Format the response according to the provided schema.',
            config: {
                responseMimeType: 'application/json',
                responseSchema: selfCareSchema,
            }
        });

        const jsonString = response.text.trim();
        const tasks = JSON.parse(jsonString) as SelfCareTask[];
        return tasks.slice(0, 3); // Ensure only 3 tasks are returned
    } catch (error) {
        console.error("Error fetching self-care tasks:", error);
        throw new Error("Failed to get self-care tasks from Gemini API.");
    }
};
