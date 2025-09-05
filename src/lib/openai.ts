// Generate vector embeddings using local TF-IDF and chat completions using OpenRouter

import * as dotenv from 'dotenv';
import OpenAI from 'openai';
import { TfIdf } from 'natural';

// Load environment variables
dotenv.config();

// OpenRouter client for chat completions
const openrouterClient = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'F1 RAG AI'
  }
});

// Simple local embedding using TF-IDF
export async function generateEmbedding(text: string) {
  try {
    console.log('Generating local embedding...');
    
    // Create a simple vector representation
    // In a real application, you'd want to use more sophisticated embeddings
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Create a fixed-size vector (384 dimensions to match common embedding models)
    const vectorSize = 384;
    const vector = new Array(vectorSize).fill(0);
    
    // Use a simple hash-based approach to distribute words across the vector
    for (const word of words) {
      const hash = simpleHash(word) % vectorSize;
      vector[hash] += 1;
    }
    
    // Normalize the vector
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (magnitude > 0) {
      for (let i = 0; i < vector.length; i++) {
        vector[i] = vector[i] / magnitude;
      }
    }
    
    // Return in OpenAI format for compatibility
    return {
      data: [{
        embedding: vector
      }]
    };
  } catch (error) {
    console.error('Local embedding error:', error);
    throw error;
  }
}

// Simple hash function for word distribution
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export async function generateResponse(question: string, context: string[]) {
  const response = await openrouterClient.chat.completions.create({
    model: "openai/gpt-4o-mini",
    messages: [{
      role: "user",
      content: `You are an expert in Formula 1 racing.
      You need to answer this question using the context provided.
      Do not mention that you have been provided with the context.
      
      Context: ${context.join('\n\n')}
      
      QUESTION: ${question}.
      `
    }]
  })

  return response.choices[0].message.content;
}