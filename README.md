# F1-AI: Retrieval-Augmented Generation (RAG) Application

## Overview

F1-AI is a Retrieval-Augmented Generation (RAG) application that leverages OpenAI's GPT-4 model and a vector database to provide context-aware answers to questions about Formula 1 racing. This project demonstrates how to build a RAG application using TypeScript, OpenAI, DataStax Astra DB, and Playwright.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [OpenAI API Key](https://beta.openai.com/signup/)
- [DataStax Astra DB](https://astra.datastax.com/register)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/IAmTomShaw/f1-rag-ai.git
```

2. Navigate to the project directory:

```bash
cd f1-rag-ai
```

3. Install the dependencies:

```bash
npm install
```

4. Install Playwright browsers (required for web scraping):

```bash
npx playwright install
```

## Configuration

1. Copy the `.env` file and fill in your credentials:

```bash
cp .env.example .env
```

2. Edit the `.env` file with your actual credentials:

```bash
# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=your-actual-openai-api-key

# DataStax Astra DB Configuration
# Get these from your Astra DB dashboard: https://astra.datastax.com/
ASTRA_DB_ID=your-actual-astra-db-id
ASTRA_DB_REGION=your-actual-astra-db-region
ASTRA_DB_USERNAME=your-actual-astra-db-username
ASTRA_DB_PASSWORD=your-actual-astra-db-password
```

**Important:** The code has been updated to automatically load these environment variables. Make sure to fill in the actual values in your `.env` file.

## Usage

### 1. First, verify your setup:

```bash
# Check your environment configuration
npm run check-setup

# Check TypeScript compilation
npx tsc --noEmit
```

### 2. Ingest Data

You can modify the list of urls that I am scraping in the `src/ingest.ts` file. You can then run the following command to scrape the data:

```bash
npm run ingest
```

This will scrape the data from the urls and store it in the Astra DB.

### 3. Test the RAG Application

You can then run the following command to test the RAG application using the query defined in the `src/answer.ts` file:

```bash
npm run answer
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credit

This project was created by [Tom Shaw](https://tomshaw.dev)
# Fastlane-RAG
