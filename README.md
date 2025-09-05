# f1 rag ai

retrieval-augmented generation system for formula 1 knowledge using local embeddings and openrouter.

## setup

```bash
npm install
cp .env.example .env
```

edit `.env` with your openrouter api key:
```bash
OPENROUTER_API_KEY=your-key-here
```

## run

terminal demo:
```bash
npx ts-node src/working-demo.ts
```

web ui (if /ui exists):
```bash
cd ui && npm install && npm run dev
```

## scripts

- `npm run answer` - basic qa test
- `npm run ingest` - scrape and store data
- `npm run check-setup` - verify environment

## how it works

uses local hash-based embeddings for document similarity search, openrouter gpt-4o-mini for responses, and in-memory vector storage for rapid prototyping.
