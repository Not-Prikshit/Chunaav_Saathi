const GEMINI_API_KEY = "AIzaSyCYeYh2IIdvGc5QW59sJMvXaeK_Skw2fos";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

async function askGemini(userMessage) {
  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ 
          role: "user", 
          parts: [{ text: userMessage }] 
        }],
        system_instruction: {
          parts: [{
            text: "You are Chunaav Saathi, an expert assistant on India's election process. Only answer questions about Indian elections, ECI rules, voter registration, EPIC card, EVM, VVPAT, NOTA, MCC, constituencies, and election phases. Keep all answers under 120 words. Use numbered steps for process questions. If asked about anything outside elections say: I only know about India's election process. Reply in the same language the user writes in — Hindi or English."
          }]
        },
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", response.status, errorText);
      
      if (response.status === 429) return "I'm a bit busy right now (Too many requests). Please try again in a minute!";
      if (response.status === 403) return "The AI service is currently unavailable (Invalid API Key or Permissions).";
      
      return "I'm having trouble connecting to the AI brain right now. Please try again later.";
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      console.warn("Empty response from Gemini:", data);
      return "I'm not sure how to answer that. Could you try rephrasing?";
    }

    return reply;

  } catch (e) {
    console.error("Chat Error:", e);
    return "Connection lost. Please check your internet and try again.";
  }
}
