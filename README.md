# Hackathon Idea Generator

Build and deploy a Hackathon Idea Generator using:
- **Backend**: FastAPI (Python 3.12+)
- **Frontend**: Next.js (App Router)
- **AI**: Google Gemini 1.5 Flash

## Quick Demo

<video src="demoVideo.webm" controls width="100%"></video>

## Prerequisites
To run this project locally, you must have the following installed on your machine:
1.  **Node.js** (v18+) and **npm** (or yarn/pnpm)
2.  **Python** (v3.12+)
3.  **Vercel CLI** (optional, for deployment)

## Setup & Running

1.  **Install Dependencies**
    ```bash
    # Install Frontend Dependencies
    npm install

    # Install Backend Dependencies
    pip install -r api/requirements.txt
    ```

2.  **Environment Setup**
    - Obtain a **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/).
    - Export it in your terminal where you run the backend:
      ```bash
      export GEMINI_API_KEY="your_api_key_here"
      ```

3.  **Run Development Servers**
    You need to run both the frontend and backend in separate terminals.

    **Terminal 1 (Backend):**
    ```bash
    # Make sure you are in the project root
    uvicorn api.index:app --reload --port 8000
    ```

    **Terminal 2 (Frontend):**
    ```bash
    npm run dev
    ```

4.  **Access the App**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1.  **Install Vercel CLI**: `npm i -g vercel`
2.  **Deploy**: Run `vercel` in the project root.
3.  **Add Environment Variable**:
    - In your Vercel Project Settings, add `GEMINI_API_KEY` with your key.

## Troubleshooting

-   **`npm` or `uvicorn` not found**: Ensure you have Node.js and Python installed and added to your system PATH.
-   **API Errors**: If the idea generation fails, check the backend terminal logs. Ensure `GEMINI_API_KEY` is set correctly.
