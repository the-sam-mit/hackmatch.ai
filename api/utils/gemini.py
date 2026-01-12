import os
import google.generativeai as genai
import json
from datetime import datetime

# Initialize Gemini
# Expects GEMINI_API_KEY in environment variables

if "GEMINI_API_KEY" in os.environ:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel('gemini-2.5-flash-lite')

async def generate_hackathon_idea(languages: list, topics: list, problem_statement: str | None = None):
    """
    Generates a hackathon idea based on skills (languages/topics) and current trends.
    Optionally considers a specific problem statement or theme.
    """
    
    # Simple trend snapshot (mimicking what would be a live search/RSS feed)
    trends = [
        "Agentic AI workflows",
        "Multimodal interactions (Voice/Video)",
        "Sustainable Tech & Energy Optimization",
        "Personalized Education with AI",
        "Hyper-local community platforms"
    ]
    
    constraint_text = ""
    if problem_statement:
        constraint_text = f"Constraint/Theme: The project MUST address the following problem statement: '{problem_statement}'"

    prompt = f"""
    You are a Hackathon Idea Generator. Create a unique, winning hackathon project idea.
    
    User Profile:
    - Top Languages: {', '.join(languages)}
    - Interests: {', '.join(topics)}
    
    Current Trends:
    {', '.join(trends)}

    {constraint_text}
    
    Generate a formatted JSON object with the following structure:
    {{
        "title": "Project Name",
        "tagline": "Short catchy tagline",
        "description": "2-3 sentence description.",
        "tech_stack": ["List", "of", "technologies"],
        "key_features": ["Feature 1", "Feature 2", "Feature 3"],
        "challenge_addressed": "What problem does this solve?"
    }}
    
    Ensure the idea combines the user's skills with at least one current trend.
    Return ONLY raw JSON.
    """

    try:
        response = model.generate_content(prompt)
        # Basic cleanup to ensure JSON
        text = response.text.replace('```json', '').replace('```', '').strip()
        return json.loads(text)
    except Exception as e:
        print(f"Error generating idea: {e}")
        return {
            "title": "Error Generating Idea",
            "tagline": "Please try again.",
            "description": "could not generate an idea at this time.",
            "tech_stack": [],
            "key_features": [],
            "challenge_addressed": str(e)
        }
