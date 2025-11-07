# ArtLens – AI-Powered Museum Experience Platform

ArtLens is a privacy-first, AI-driven digital museum companion that enhances visitor experiences without requiring login or app installation. Users can scan artworks using their phone camera to instantly unlock immersive stories, AR experiences, audio narrations, and personalized museum journeys — while museums receive anonymous engagement analytics and secure digital rights protection through blockchain.

***

## Features

- No Login or Sign-Up Required – Works instantly on any device  
- AI Artwork Recognition – Identify artwork in seconds  
- Immersive Storytelling – Audio, visuals, artist insights, and narratives  
- Smart Museum Journey – Personalized exhibit paths and AI recommendations  
- Privacy-First Analytics – Anonymous visitor insights  
- AR “Time Travel” Mode – See creation, aging, and restoration phases  
- AI Curator Assistant – Age-appropriate explanations for visitors  
- Blockchain Digital Rights – Content protection via Polygon & smart contracts  
- Offline Friendly – Works even with low or no internet  

***

## Tech Stack

### Frontend
React -  CSS3 -  Three.js -  Progressive Web App (PWA)

### AI & GenAI
Vertex AI -  Gemini API -  CLIP -  CNN Models -  RAG System -  Pinecone -  Whisper -  Text-To-Speech (TTS)

### Backend
Node.js -  Express.js -  Python -  FastAPI

### Database & Storage
MongoDB -  Pinecone -  Redis

### Blockchain
Polygon -  Solidity

### Analytics
PostHog -  Custom Heatmaps

### Infra & DevOps
Docker -  GitHub Actions -  AWS -  Vercel

***

## Environment Variables (.env Setup)

Create separate `.env` files for each backend service.

### Python FastAPI (.env)

```env
# Pinecone
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment

# GenAI
GEMINI_API_KEY=your_gemini_api_key
VERTEX_PROJECT_ID=your_project_id

# Database
MONGODB_URI=your_mongodb_uri

# Redis (optional)
REDIS_URL=your_redis_url
```

### Node.js Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

**Warning:** Never commit `.env` files to GitHub. Add them to `.gitignore`.

***

## Running the Project

### Python Backend (FastAPI + RAG + AI)

```bash
cd backend
uvicorn app:app --reload --port 8000
```
Runs at: [http://localhost:8000](http://localhost:8000)

### Node.js Backend

```bash
cd backend-node
npm install
npm start
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
Runs at: [http://localhost:5173](http://localhost:5173)

***

## Developers & Contributors

| Name | Role | Social |
|------|------|---------|
| Bhaskara | Team Lead & Full Stack + AI | [LinkedIn](https://www.linkedin.com/in/bhaskara-88aa76322) |
| Adhitya A S | AI\ML | — |
| Sanjeev R B | Frontend/UI/UX | — |
| Sheldon Dsouza | Frontend/UI/UX | — |

***

## Contributing

Contributions, issues, and feature requests are always welcome.  
Fork this repo, open a PR, or suggest enhancements through Issues.

***

## License

This project is licensed under the MIT License.

If you like this project, please star the repository — it helps support development!

