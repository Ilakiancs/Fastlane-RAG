// Complete working F1 RAG demo with in-memory vector storage
import { generateEmbedding, generateResponse } from "./lib/openai";

// Simple in-memory vector database
interface Document {
  id: string;
  text: string;
  embedding: number[];
  source: string;
}

const documents: Document[] = [];

// Cosine similarity function
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Add documents to our vector store
async function addDocument(text: string, source: string) {
  const embedding = await generateEmbedding(text);
  const doc: Document = {
    id: `doc-${Date.now()}-${Math.random()}`,
    text,
    embedding: embedding.data[0].embedding,
    source
  };
  documents.push(doc);
  return doc.id;
}

// Search for similar documents
async function searchDocuments(query: string, limit: number = 3): Promise<Document[]> {
  const queryEmbedding = await generateEmbedding(query);
  const queryVector = queryEmbedding.data[0].embedding;
  
  // Calculate similarities and sort
  const similarities = documents.map(doc => ({
    doc,
    similarity: cosineSimilarity(queryVector, doc.embedding)
  }));
  
  similarities.sort((a, b) => b.similarity - a.similarity);
  return similarities.slice(0, limit).map(item => item.doc);
}

async function runDemo() {
  console.log('F1 RAG System Demo');
  console.log('====================\n');
  
  // Step 1: Add some F1 knowledge to our vector store
  console.log('Adding F1 knowledge to vector store...');
  await addDocument(
    "Formula 1 is the highest class of international racing for open-wheel single-seater formula racing cars sanctioned by the Fédération Internationale de l'Automobile (FIA).",
    "wikipedia"
  );
  
  await addDocument(
    "George Russell is a British racing driver currently competing in Formula One for Mercedes. He previously raced for Williams from 2019 to 2021.",
    "wikipedia"
  );
  
  await addDocument(
    "Max Verstappen is a Dutch-Belgian racing driver competing in Formula One for Red Bull Racing. He is a three-time Formula One World Champion.",
    "wikipedia"
  );
  
  await addDocument(
    "The Qatar Grand Prix is a Formula One motor race held at the Losail International Circuit in Qatar. The race has been controversial due to track conditions and safety concerns.",
    "wikipedia"
  );
  
  console.log(`Added ${documents.length} documents to vector store\n`);
  
  // Step 2: Test the RAG system
  const questions = [
    "What is Formula 1?",
    "Who is George Russell?", 
    "Tell me about Max Verstappen",
    "What happened at Qatar 2024?"
  ];
  
  for (const question of questions) {
    console.log(`Question: ${question}`);
    
    // Find relevant documents
    console.log('Searching for relevant documents...');
    const relevantDocs = await searchDocuments(question);
    console.log(`   Found ${relevantDocs.length} relevant documents`);
    
    // Generate response using OpenRouter
    console.log('Generating response with OpenRouter...');
    const context = relevantDocs.map(doc => doc.text);
    const response = await generateResponse(question, context);
    
    console.log(`💬 Response: ${response}\n`);
    console.log('─'.repeat(50) + '\n');
  }
  
  console.log('RAG System Demo Complete!');
  console.log('\nSystem Components:');
  console.log('Local embeddings (384 dimensions)');
  console.log('In-memory vector search');
  console.log('OpenRouter chat completions');
  console.log('End-to-end RAG pipeline');
}

// Run the demo
runDemo().catch(console.error);
