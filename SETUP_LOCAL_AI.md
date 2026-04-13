# BolKe: Local AI Setup Guide

To run BolKe with 100% open-source local AI models, follow these steps to install and configure the necessary tools.

## 1. Local LLM (Ollama)
Ollama is used for extracting shop details from transcriptions and generating site content.

### Installation
1. Download for Windows: [ollama.com/download](https://ollama.com/download/windows)
2. Open your terminal/PowerShell and download the models:
   ```powershell
   # Basic reliable model
   ollama pull llama3:8b
   
   # For even better JSON extraction
   ollama pull mistral
   
   # For advanced logic/coding
   ollama pull deepseek-coder:6.7b
   ```

3. Ensure Ollama is running (it usually starts in the system tray).

---

## 2. Speech-to-Text (Whisper)
Whisper is used to transcribe your voice recordings.

### Option A: Faster-Whisper (Recommended)
1. Install Python 3.10+ if you don't have it.
2. Install the package:
   ```powershell
   pip install faster-whisper
   ```
3. Use the following script to start a simple local server (I can help you create this in the next step).

### Option B: Whisper.cpp
- High-performance C++ implementation.
- Good for low-RAM machines.

---

## 3. Environment Configuration
Update your `.env` file in the root directory:

```env
# AI Settings
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3

# Domain Settings
MAIN_DOMAIN=localhost:3000
APP_URL=http://localhost:3000
```

---

## 4. Troubleshooting
- **Slow Response**: Ensure you have at least 8GB of RAM. If you have an NVIDIA GPU, Ollama will automatically use it for 10x faster speed.
- **Connection Refused**: Check if Ollama is running on port 11434.
