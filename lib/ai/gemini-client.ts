import { apiKeyManager } from "./api-key-manager";
import { aiLogger } from "./logger";

export const geminiClient = {
  async generateContent(
    systemPrompt: string,
    userInput: string,
    userId?: string,
    type: "recommender" | "creator" = "creator"
  ): Promise<string> {
    const startTime = Date.now();
    const { key, type: keyUsed } = await apiKeyManager.getEffectiveApiKey(userId);

    if (!key) {
      console.error("DEBUG: No Gemini API key found.");
      throw new Error("No Gemini API key available.");
    }
    
    console.log("DEBUG: Using Gemini API key, type:", keyUsed, "last 4 chars:", key.slice(-4));

    // Kaskáda modelů v opačném pořadí – nejdříve zkoušíme kvalitnější modely s menší kvótou,
    // a teprve po jejich vyčerpání saháme do velkokapacitní "lite" rezervy.
    const modelsToTry = [
      'gemini-2.0-flash',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-flash-lite-latest',
      'gemini-2.5-flash-lite',
    ];
    
    const prompt = `${systemPrompt}\n\nUživatelův vstup: ${userInput}`;
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${key}`;
        
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }]
          })
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          
          if (!aiText) continue;

          aiLogger.logRequest({
            type,
            input: userInput,
            output: aiText,
            fallback: false,
            durationMs: Date.now() - startTime,
            keyUsed,
          });

          return aiText;
        } else {
          const errData = await res.json().catch(() => ({}));
          console.warn(`Model ${modelName} selhal s kódem ${res.status}:`, errData);
          lastError = new Error(`API Error ${res.status}: ${JSON.stringify(errData)}`);
        }
      } catch (e) {
        lastError = e;
        console.error(`Chyba při volání ${modelName}:`, e);
      }
    }

    throw new Error(
      lastError?.message?.includes("429") 
        ? "Byl překročen limit API klíče (Error 429). Zkuste to prosím za chvíli nebo použijte jiný klíč." 
        : "Nepodařilo se připojit k žádnému z modelů Gemini. Zkontrolujte prosím svůj API klíč."
    );
  },
};
