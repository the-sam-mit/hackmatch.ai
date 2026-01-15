import httpx
import asyncio

async def get_user_data(username: str, client: httpx.AsyncClient):
    """
    Fetches public repositories and starred repos for a given GitHub username.
    """
    base_url = "https://api.github.com"
    headers = {
        "Accept": "application/vnd.github.v3+json",
        # Add User-Agent as per GitHub API requirements
        "User-Agent": "Hackathon-Idea-Generator" 
    }

    # Fetch public repos
    repos_url = f"{base_url}/users/{username}/repos?sort=updated&per_page=10"
    repos_resp = await client.get(repos_url, headers=headers)
    
    # Fetch starred repos
    starred_url = f"{base_url}/users/{username}/starred?sort=created&per_page=10"
    starred_resp = await client.get(starred_url, headers=headers)

    languages = {}
    topics = []

    if repos_resp.status_code == 200:
        repos = repos_resp.json()
        for repo in repos:
            if repo.get("language"):
                lang = repo["language"]
                languages[lang] = languages.get(lang, 0) + 1
            if repo.get("topics"):
                topics.extend(repo["topics"])

    if starred_resp.status_code == 200:
        starred = starred_resp.json()
        for repo in starred:
             if repo.get("language"):
                lang = repo["language"]
                languages[lang] = languages.get(lang, 0) + 1
             if repo.get("topics"):
                topics.extend(repo["topics"])
    
    return {
        "languages": languages,
        "topics": topics
    }

async def get_team_data(usernames: list[str]):
    """
    Fetches and aggregates data for multiple GitHub users.
    """
    aggregated_languages = {}
    aggregated_topics = set()
    
    async with httpx.AsyncClient() as client:
        tasks = [get_user_data(user, client) for user in usernames]
        results = await asyncio.gather(*tasks)
        
        for data in results:
            # Aggregate languages
            for lang, count in data["languages"].items():
                aggregated_languages[lang] = aggregated_languages.get(lang, 0) + count
            
            # Aggregate topics
            aggregated_topics.update(data["topics"])
            
    # Sort languages by frequency
    sorted_languages = sorted(aggregated_languages.items(), key=lambda item: item[1], reverse=True)
    top_languages = [lang for lang, count in sorted_languages[:8]] # Increased to top 8 for team diversity
    
    return {
        "languages": top_languages,
        "topics": list(aggregated_topics)[:15] # Increased limit for team
    }
