from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from api.utils.github import get_user_data
from api.utils.gemini import generate_hackathon_idea

app = FastAPI()

class UserRequest(BaseModel):
    username: str
    problem_statement: str | None = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/generate")
async def generate_idea(request: UserRequest):
    if not request.username:
        raise HTTPException(status_code=400, detail="Username is required")

    try:
        # 1. Fetch User Data
        user_data = await get_user_data(request.username)
        
        # 2. Generate Idea using Gemini
        idea = await generate_hackathon_idea(
            user_data.get("languages", []),
            user_data.get("topics", []),
            request.problem_statement
        )
        
        return idea

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
