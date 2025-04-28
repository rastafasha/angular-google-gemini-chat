import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';


@Injectable({
  providedIn: 'root'
})
export class GoogleGeminiProService {

  genIA: any;
  model: any;

  initialize(key: string, modelName?: string) {
    this.genIA = new GoogleGenerativeAI(key);
    // Use provided modelName or default to a known valid model
    const model = modelName ? { model: modelName } : { model: 'models/gemini-2.0-flash' };
    this.model = this.genIA.getGenerativeModel(model);
  }

  async generateText(prompt: string) {
    if (!this.model) {
      return;
    }
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  async listModels() {
    if (!this.genIA) {
      throw new Error('GoogleGenerativeAI client not initialized. Call initialize() first.');
    }
    try {
      const models = await this.genIA.listModels();
      return models;
    } catch (error) {
      console.error('Error listing models:', error);
      throw error;
    }
  }

}
