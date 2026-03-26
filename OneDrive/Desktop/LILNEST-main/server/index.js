import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (_req, res) => {
  res.json({ ok: true, name: 'LILNEST API' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages = [], model = 'llama-3.1-8b-instant', system } = req.body || {};
    const chatMessages = [];
    if (system) chatMessages.push({ role: 'system', content: system });
    for (const m of messages) {
      if (m?.role && m?.content) chatMessages.push({ role: m.role, content: m.content });
    }

    const completion = await groq.chat.completions.create({
      model,
      messages: chatMessages.length ? chatMessages : [{ role: 'user', content: 'Hello' }],
      temperature: 0.3,
      max_tokens: 1024,
    });

    const reply = completion?.choices?.[0]?.message?.content || '';
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: 'Chat request failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`LILNEST server running on http://localhost:${PORT}`);
});
