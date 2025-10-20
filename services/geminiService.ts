
import { GoogleGenAI } from "@google/genai";

export async function getGenerativeResponse(prompt: string): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("A chave da API está faltando. Por favor, defina a variável de ambiente API_KEY.");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "Você é um assistente prestativo que responde diretamente ao que foi solicitado. Não repita o prompt ou as instruções na sua resposta."
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fix: Throw an error to be handled by the caller (UI component)
    if (error instanceof Error) {
        throw new Error(`Erro ao chamar a API: ${error.message}`);
    }
    throw new Error("Ocorreu um erro desconhecido ao chamar a API.");
  }
}