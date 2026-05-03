"use strict";

/**
 * Sends a message to the backend proxy and returns the response.
 * @param {string} userMessage The user's input message.
 * @returns {Promise<string>} The API's response or an error message.
 */
async function askGemini(userMessage) {
  const BACKEND_URL = `http://localhost:3001/api/chat`;

  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Backend Proxy Error:", response.status, errorData);
      
      if (response.status === 429) {
        return "I'm a bit busy right now (Too many requests). Please try again later.";
      }
      if (response.status === 400 && errorData.details && errorData.details.error) {
        return `API Error: ${errorData.details.error.message} Please check your .env file and ensure the API key is correct.`;
      }
      if (response.status === 500 && errorData.error && errorData.error.includes("missing Gemini API Key")) {
        return "The backend server is missing the Gemini API Key. Please configure the .env file on the server.";
      }
      
      return `I'm having trouble connecting (Error ${response.status}). Please ensure the local backend server is running.`;
    }

    const data = await response.json();
    const reply = data.reply;

    if (!reply) {
      console.warn("Empty response from Backend:", data);
      return "I'm not sure how to answer that. Could you try rephrasing?";
    }

    return reply;

  } catch (e) {
    console.error("Chat Error:", e);
    return "Failed to connect to the backend server. Make sure you ran 'node server.js'.";
  }
}
