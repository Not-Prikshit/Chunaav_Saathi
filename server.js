const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON requests

// Routes
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "Server is missing Gemini API Key. Please configure the .env file." });
  }

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "http://localhost:3000/" // Added to bypass local restriction
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: message }] }],
        systemInstruction: {
            parts: [{ text: "You are 'Chunaav Saathi', an expert AI assistant dedicated exclusively to helping Indian citizens understand the election process... Keep your answers short, crisp, and under 5 sentences. Use bullet points if necessary. Always maintain a helpful, respectful, and strictly non-partisan tone. Refuse to answer questions unrelated to Indian elections, politics, or governance." }]
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to communicate with Google API", details: data });
    }

    if (data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      res.json({ reply });
    } else {
      res.status(500).json({ error: "Received unexpected format from Gemini API" });
    }
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    res.status(500).json({ error: "Internal server error while connecting to AI service" });
  }
});

// Explicitly serve static directories
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/pngs', express.static('pngs'));
app.use(express.static('./'));

app.listen(PORT, () => {
  console.log(`Chunaav Saathi backend is running on http://localhost:${PORT}`);
});
