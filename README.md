# AI Resume Analyzer

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
