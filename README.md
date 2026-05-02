# Chunaav Saathi — चुनाव साथी

A pure frontend, zero-dependency web app that guides Indian voters through every step of the election process — from voter registration to casting a vote with confidence.

## 🗳️ Features

- **Home** — Hero with key election stats
- **Timeline** — All 10 phases of a Lok Sabha election
- **How to Vote** — 6-step voting guide with official ECI info
- **Quiz** — 5-question interactive quiz with explanations
- **Ask AI** — Gemini-powered chat assistant (Hindi & English)

## 🚀 How to Run

1. Open `index.html` directly in any modern browser — no server needed.
2. To enable the AI chat, replace the API key in `js/chat.js`:
   ```js
   const GEMINI_API_KEY = "YOUR_ACTUAL_GEMINI_API_KEY";
   ```
   Get a free key at: https://aistudio.google.com/app/apikey

## 📁 File Structure

```
Chunaav_Saathi/
├── index.html          # Main HTML (all sections)
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Tab switching, language toggle, chat UI
│   ├── quiz.js         # Quiz data + rendering logic
│   └── chat.js         # Gemini API integration
├── README.md
├── .gitignore
└── .env.example
```

## 🌐 Language Support

Click the **हिंदी / English** toggle in the top right to switch UI language. The AI assistant also responds in whichever language you write in.

## 🔒 Privacy

- No login required
- No data stored or sent (except your chat messages to the Gemini API)
- Works completely offline except for the AI chat feature

## 📖 Data Sources

- Election Commission of India: https://eci.gov.in
- Voter Portal: https://voterportal.eci.gov.in
- Constitution of India, Article 326 (right to vote)

## 📦 Size

Total app size is under 10 MB. No npm, no build tools, no frameworks.

## 📄 License

For educational and informational purposes only. Not an official ECI product.
