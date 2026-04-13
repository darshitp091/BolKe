# BolKe Backend Implementation Guide

This guide explains how to connect open-source AI tools to the BolKe backend.

## 1. Core AI Stack (Open Source)

| Task | Tool | Provider (API) | Why? |
| :--- | :--- | :--- | :--- |
| **Speech-to-Text** | Whisper-v3 | [Groq](https://groq.com/) | Fastest inference for open-source Whisper. |
| **LLM (Extraction)** | Llama-3-70B | [Groq](https://groq.com/) or [Gemini](https://ai.google.dev/) | High reasoning for extracting shop details. |
| **Translation** | NLLB-200 | [Hugging Face](https://huggingface.co/) | Best for 200+ languages including Indian dialects. |

## 2. Getting API Keys

### Groq (Whisper & Llama)
1. Go to [Groq Cloud](https://console.groq.com/).
2. Sign up and create an API Key.
3. Add it to your `.env` as `GROQ_API_KEY`.

### Gemini (Alternative for LLM)
1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Get your API key and add it as `GEMINI_API_KEY`.

## 3. Implementation Logic (`server.ts`)

```typescript
import multer from "multer";
import { Groq } from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/generate-site", upload.single('audio'), async (req, res) => {
  const audioFile = req.file;
  if (!audioFile) return res.status(400).send("No audio uploaded");
  
  // 1. Transcription (Whisper)
  // Convert buffer to file for Groq
  const transcription = await groq.audio.transcriptions.create({
    file: audioFile.buffer,
    model: "whisper-large-v3",
  });

  // 2. Extraction (Llama 3)
  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: "Extract shop name, category, and city from the text." },
      { role: "user", content: transcription.text }
    ],
    model: "llama3-70b-8192",
    response_format: { type: "json_object" }
  });

  const shopData = JSON.parse(completion.choices[0].message.content);
  
  // 3. Save to Database (Alternative to Firebase)
  // See "Database Alternatives" below
  
  res.json({ success: true, details: shopData });
});
```

## 4. Database Alternatives (Open Source)

Since we are not using Firebase, here are the best open-source alternatives:

1. **SQLite (Local & Fast)**:
   - `npm install sqlite3 sqlite`
   - Perfect for starting out without any cloud setup.
   - Data stays in a local `.db` file.

2. **MongoDB (NoSQL)**:
   - Use **MongoDB Atlas** (Free Tier) or host your own.
   - `npm install mongodb`
   - Flexible schema like Firebase.

3. **PostgreSQL (Relational)**:
   - Use **Supabase** (Open Source Firebase Alt) or **Neon.tech**.
   - `npm install pg`
   - Best for complex data relationships.

## 5. Running Locally
1. `npm install`
2. `npm run dev` (This runs the Express server + Vite)
3. The server will be live on `http://localhost:3000`.

## 5. Deployment
When you are ready to go live:
1. Run `npm run build` to generate the static frontend.
2. The `server.ts` will automatically serve the `dist` folder in production mode.
3. Deploy to **Cloud Run** or any Node.js host.
