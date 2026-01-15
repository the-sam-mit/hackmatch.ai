import os
import google.generativeai as genai
import json
from datetime import datetime

# Initialize Gemini
# Expects GEMINI_API_KEY in environment variables

if "GEMINI_API_KEY" in os.environ:
    genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel('gemini-2.5-flash-lite')

async def generate_hackathon_idea(skills: list[str], problem_statement: str | None = None):
    """
    Generates a hackathon idea based on user skills and current trends.
    Optionally considers a specific problem statement or domain of interest.
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
        constraint_text = f"Constraint/Theme: The project MUST address the following problem statement or domain: '{problem_statement}'"

    prompt = f"""
    You are a World-Class Hackathon Strategist and Technical Mentor. Your goal is to conceive a winning, innovative hackathon project idea that stands out to judges.

    User/Team Profile:
    - Skills & Technologies: {', '.join(skills) if skills else "General/No specific skills provided (Assume standard modern web stack)"}
    - Context: The idea should leverage the collective strengths of this skill pool to create a high-impact solution.
    
    Current Industry Trends:
    {', '.join(trends)}

    {constraint_text}
    
    INSTRUCTIONS:
    1. Analyze the user's skills and find a creative intersection with a high-impact trend.
    2. Focus on "Novelty" and "Impact". Avoid generic to-do lists or simple CRUD apps.
    3. The idea must be ambitious but pitchable.
    
    Generate a JSON object with this exact structure:
    {{
        "title": "A Catchy, Memorable Project Name",
        "tagline": "A punchy, investor-grade tagline (under 10 words)",
        "description": "A compelling 2-3 sentence elevator pitch that highlights the problem and the innovative solution.",
        "tech_stack": ["Specific", "Libraries", "or", "Frameworks"],
        "key_features": ["Killer Feature 1", "Killer Feature 2", "Killer Feature 3"],
        "challenge_addressed": "What significant pain point does this solve? (Be specific)",
    }}
    
    Return ONLY valid, raw JSON. Do not use markdown formatting.
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
