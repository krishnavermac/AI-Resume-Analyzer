AI Resume Analyzer is a MERN stack web application that analyzes uploaded resumes and provides an ATS-style score, extracted skills, strengths, weaknesses, missing sections, and improvement suggestions.

## Features

- Upload resume in PDF/DOCX format
- Extract resume text automatically
- Analyze resume using AI
- Generate ATS score
- Identify extracted skills
- Show strengths and weaknesses
- Suggest resume improvements
- Store analysis history in MongoDB
- Professional React frontend

## Screenshots
<img width="1470" height="836" alt="Screenshot 2026-05-30 at 9 24 36 AM" src="https://github.com/user-attachments/assets/b9dbbe6d-935b-4f18-94db-02333149d514" />
<img width="1469" height="833" alt="Screenshot 2026-05-30 at 9 25 01 AM" src="https://github.com/user-attachments/assets/f6a0c284-bf5b-4ed5-b127-dc6978e4f5e1" />
<img width="1470" height="789" alt="Screenshot 2026-05-30 at 9 25 19 AM" src="https://github.com/user-attachments/assets/c6aadd78-0a60-4d87-a906-7318f1ce9b3e" />


## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS

### Backend
- Node.js
- Express.js
- Multer
- MongoDB
- Mongoose
- Groq API

## Project Structure

```txt
ai-resume-analyzer/
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   └── resumeController.js
│   ├── models/
│   │   └── ResumeAnalysis.js
│   ├── routes/
│   │   └── resumeRoutes.js
│   ├── utils/
│   │   ├── aiAnalyzer.js
│   │   └── extractText.js
│   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## Installation

Clone Repository

``` 
git clone https://github.com/krishnavermac/ai-resume-analyzer.git
cd ai-resume-analyzer
```

Backend Setup

```
cd server
npm install
```

Frontend Setup
```
cd ../client
npm install
```

## Environment Variables

Create a .env file inside the server directory.
```
PORT=8000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

## Running the Application

- Start Backend
```
cd server
npm run dev
```

- Backend runs at:

  
http://localhost:8000

- Start Frontend
```
cd client
npm run dev
```

- Frontend runs at:
  
http://localhost:5173

**API Endpoints**
- Upload Resume
POST /api/resume/upload
Request

Multipart Form Data
```
resume : PDF/DOCX file
Response
{
  "atsScore": 82,
  "extractedSkills": [
    "React",
    "Node.js",
    "MongoDB"
  ],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "missingSections": [],
  "jobRoleFit": "Good fit for MERN Developer roles"
}
```

## Get Resume Analysis History

- GET /api/resume/history

- Returns all previously analyzed resumes stored in MongoDB.

## Database Schema
```
{
  fileName: String,
  resumeText: String,
  atsScore: Number,
  extractedSkills: [String],
  strengths: [String],
  weaknesses: [String],
  suggestions: [String],
  missingSections: [String],
  jobRoleFit: String
}
```

## Key Learning Outcomes
- Building full-stack MERN applications
- REST API development with Express
- MongoDB integration using Mongoose
- File uploads using Multer
- PDF and DOCX parsing
- AI integration using Groq APIs
- Prompt engineering for structured outputs
- Frontend-backend communication using Axios
- Responsive UI development using React

## Future Enhancements

- User Authentication (JWT)
- Resume vs Job Description Matching
- Resume Score Trend Dashboard
- Downloadable PDF Reports
- Resume Templates
- Role-specific ATS Analysis
- Cloud Deployment

## Author

Krishna Verma

ECE Student, IIIT Allahabad

Interested in:
- Full Stack Development
- Competitive Programming
- Data Structures & Algorithms
- Artificial Intelligence
