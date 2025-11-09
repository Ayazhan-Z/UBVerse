const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path'); // 👈 add this

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Serve static files from the project root (where index.html lives)
app.use(express.static(path.join(__dirname)));

// ✅ Explicitly serve index.html at "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- your AI setup below ---
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("❌ Missing GEMINI_API_KEY in .env");
  process.exit(1);
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) return res.status(400).json({ error: "Message needed" });

    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(`REPLY IN PLAIN TEXT, AND NOT MARKDOWN!\n\n${message}`);
    res.json({ reply: (await result.response).text() });
  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({ error: "My brain froze! 🥶 Try again." });
  }
});

app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
