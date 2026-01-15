from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from api.utils.github import get_user_data
from api.utils.gemini import generate_hackathon_idea

app = FastAPI()

class UserRequest(BaseModel):
    username: str | None = None
    skills: list[str] = []
    problem_statement: str | None = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/generate")
async def generate_idea(request: UserRequest):
    try:
        all_skills = set(request.skills)
        
        # 1. Fetch User Data (Optional)
        # 1. Fetch User Data (Optional)
        if request.username:
             usernames = [u.strip() for u in request.username.split(',') if u.strip()]
             if usernames:
                from api.utils.github import get_team_data
                github_data = await get_team_data(usernames)
                all_skills.update(github_data.get("languages", []))
                all_skills.update(github_data.get("topics", []))
        
        # 2. Generate Idea using Gemini
        idea = await generate_hackathon_idea(
            list(all_skills),
            request.problem_statement
        )
        
        return idea

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
