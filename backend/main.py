from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load .env from project root
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

app = FastAPI()

# Allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TopicRequest(BaseModel):
    topic: str

class NodesResponse(BaseModel):
    topic: str
    nodes: list[str]

class AnswerRequest(BaseModel):
    answer: str

class AnswerResponse(BaseModel):
    result: str

@app.post("/generate-nodes", response_model=NodesResponse)
def generate_nodes(req: TopicRequest):
    if not req.topic:
        raise HTTPException(status_code=400, detail="Topic is required")
    # MOCK: Replace with LLM call later
    nodes = [f"{req.topic} Subtopic {i+1}" for i in range(5)]
    return NodesResponse(topic=req.topic, nodes=nodes)

@app.post("/check-answer", response_model=AnswerResponse)
def check_answer(req: AnswerRequest):
    if req.answer.strip().lower() == "rice":
        return AnswerResponse(result="Correct answer")
    else:
        return AnswerResponse(result=f"incorrect, the answer is not {req.answer}")
