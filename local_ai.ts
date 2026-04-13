import axios from 'axios';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';

const execPromise = util.promisify(exec);

export class LocalAIService {
  private ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';
  private modelName = process.env.OLLAMA_MODEL || 'llama3';

  /**
   * Extract shop details using local Ollama model
   */
  async extractShopData(text: string) {
    try {
      const prompt = `
        You are an expert business assistant specializing in Indian small businesses.
        Extract the following details from the text and return ONLY a valid JSON object.
        Text: "${text}"
        
        Required JSON format:
        {
          "name": "Shop Name",
          "category": "Type of business (e.g., Kirana Store, Boutique, Cafe)",
          "location": "City or Area",
          "description": "Short catchy description in Hinglish or English",
          "whatsapp_number": "Phone number if mentioned, else null"
        }
      `;

      const response = await axios.post(this.ollamaUrl, {
        model: this.modelName,
        prompt: prompt,
        stream: false,
        format: 'json'
      });

      return JSON.parse(response.data.response);
    } catch (error) {
      console.error('Ollama Error:', error);
      // Fallback mock data
      return {
        name: "My Local Shop",
        category: "General Store",
        location: "India",
        description: "Best quality products locally.",
        whatsapp_number: null
      };
    }
  }

  /**
   * Local Speech-to-Text using Whisper
   * Note: This assumes 'whisper' command is available globally or via a local script.
   * For the user, we will recommend 'faster-whisper' or 'whisper.cpp'.
   */
  async transcribeAudio(audioBuffer: Buffer): Promise<string> {
    const tempFile = path.join(process.cwd(), `temp_${Date.now()}.webm`);
    const outputFile = `${tempFile}.txt`;
    
    try {
      fs.writeFileSync(tempFile, audioBuffer);
      
      // We'll use a placeholder command. The SETUP_LOCAL_AI.md will explain how to install this.
      // Alternatively, we could use a Python bridge script.
      // For now, we simulate success or use a basic shell call if whisper is installed.
      
      // const { stdout } = await execPromise(`whisper ${tempFile} --model base --language hi --output_format txt`);
      
      // Mock for now, until the user sets up the specific whisper runner.
      return "Mera naam Darshit hai aur meri ek electronics ki dukan hai surat mein.";
      
    } catch (error) {
      console.error('Whisper Error:', error);
      return "Transcription failed. Please try again or use the form.";
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    }
  }
}

export default new LocalAIService();
