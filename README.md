# Mindmap LLM App

A fullstack app for generating mindmaps from topics using LLMs. Users can enter a topic (by typing or speaking), and the app will generate a mindmap of related ideas using an LLM. Built with:

- **Frontend:** Vite + React + TypeScript + Tailwind CSS + D3.js
- **Backend:** FastAPI (Python)

---

## Prerequisites
- Node.js (v16+ recommended)
- Python 3.9+

---

## Getting Started

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Environment Variables
Create a `.env` file at the project root. For example (using OpenAI):
```
OPENAI_API_KEY=sk-...
```

---

## Frontend Setup

```sh
cd frontend
npm install
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## Backend Setup

```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
- The API will be available at [http://localhost:8000](http://localhost:8000)

---

## Development Notes
- The backend `/generate-nodes` endpoint is currently mocked. Swap in your preferred LLM API in `backend/main.py`.
- The frontend uses React Query for API calls and D3.js for mindmap visualization.
- Tailwind CSS v4 is used; no CLI init is needed—just edit `src/index.css`.
- `.env` is gitignored for safety.

---

## Contributing
- Make sure to pull the latest changes before starting work.
- Use feature branches and submit PRs for review.
- Keep sensitive keys in `.env` and **never commit them**.

---

## Questions?
Open an issue or ask in the project chat!
