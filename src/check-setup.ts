import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Checking F1 RAG AI Project Setup...\n');

// Check Node.js version
console.log(`Node.js version: ${process.version}`);

// Check required environment variables
const requiredEnvVars = [
  'OPENAI_API_KEY',
  'ASTRA_DB_APPLICATION_TOKEN',
  'ASTRA_DB_ID',
  'ASTRA_DB_REGION',
  'ASTRA_DB_API_ENDPOINT'
];

let allEnvVarsSet = true;

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value && value.trim() !== '') {
    console.log(`${envVar}: Set`);
  } else {
    console.log(`${envVar}: Not set or empty`);
    allEnvVarsSet = false;
  }
});

console.log('\nSetup Status:');
if (allEnvVarsSet) {
  console.log('All environment variables are configured!');
  console.log('You can now run: npm run ingest');
} else {
  console.log('Please set all environment variables in your .env file');
  console.log('Copy .env.example to .env and fill in your credentials');
}

console.log('\nNext steps:');
console.log('1. Make sure your DataStax Astra DB is created and running');
console.log('2. Run: npm run ingest (to scrape and store data)');
console.log('3. Run: npm run answer (to test the RAG application)');
