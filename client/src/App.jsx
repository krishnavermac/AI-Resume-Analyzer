import { useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:8000/api/resume/upload";

function App() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const score = analysis?.atsScore ?? 0;

  const scoreTone = useMemo(() => {
    if (score >= 80) return "excellent";
    if (score >= 65) return "good";
    if (score >= 45) return "warning";
    return "poor";
  }, [score]);

  const uploadResume = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setAnalysis(null);

      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAnalysis(res.data.analysis);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.error || "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) setFile(dropped);
  };

  return (
    <div className="page">
      <div className="background-glow glow-1" />
      <div className="background-glow glow-2" />

      <header className="topbar">
        <div>
          <p className="brand-kicker">AI Resume Analyzer</p>
          <h1>Professional ATS analysis for modern resumes</h1>
          <p className="hero-text">
            Upload a PDF or DOCX resume and get a clean, structured report with
            ATS score, skill extraction, improvement suggestions, and role-fit
            insights.
          </p>
        </div>

        <div className="topbar-card">
          <div className="mini-stat">
            <span>Input</span>
            <strong>PDF / DOCX</strong>
          </div>
          <div className="mini-stat">
            <span>Analysis</span>
            <strong>ATS + AI Review</strong>
          </div>
          <div className="mini-stat">
            <span>Output</span>
            <strong>Actionable feedback</strong>
          </div>
        </div>
      </header>

      <main className="shell">
        <section className="panel upload-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">Resume Upload</p>
              <h2>Analyze your resume</h2>
            </div>
            <span className="pill">Fast · Clean · Structured</span>
          </div>

          <div
            className={`dropzone ${dragActive ? "active" : ""} ${file ? "filled" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
          >
            <input
              id="resume-file"
              type="file"
              accept=".pdf,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="resume-file" className="dropzone-content">
              <div className="upload-icon">↥</div>
              <div>
                <h3>{file ? file.name : "Drag and drop your resume"}</h3>
                <p>
                  {file
                    ? "File ready for analysis"
                    : "or click to browse PDF / DOCX"}
                </p>
              </div>
            </label>
          </div>

          <div className="action-row">
            <button className="primary-btn" onClick={uploadResume} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>

            <div className="file-meta">
              <span>Accepted format</span>
              <strong>PDF, DOCX</strong>
            </div>
          </div>
        </section>

        <section className="panel overview-panel">
          <div className="panel-heading">
            <div>
              <p className="section-label">Analysis Overview</p>
              <h2>ATS score and summary</h2>
            </div>
          </div>

          {analysis ? (
            <div className="overview-grid">
              <div className={`score-card ${scoreTone}`}>
                <div className="score-ring" style={{ "--score": `${score}%` }}>
                  <div className="score-ring-inner">
                    <span>ATS</span>
                    <strong>{score}</strong>
                    <small>/100</small>
                  </div>
                </div>
                <p className="score-note">
                  {scoreTone === "excellent" && "Strong resume structure and keyword match."}
                  {scoreTone === "good" && "Solid baseline. Some improvements can raise the score."}
                  {scoreTone === "warning" && "Moderate result. Optimize content and keywords."}
                  {scoreTone === "poor" && "Needs stronger structure and clearer role targeting."}
                </p>
              </div>

              <div className="summary-card">
                <Stat label="Skills found" value={analysis.extractedSkills?.length ?? 0} />
                <Stat label="Strengths" value={analysis.strengths?.length ?? 0} />
                <Stat label="Weaknesses" value={analysis.weaknesses?.length ?? 0} />
                <Stat label="Suggestions" value={analysis.suggestions?.length ?? 0} />
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <h3>No analysis yet</h3>
              <p>Upload a resume to generate a professional ATS report.</p>
            </div>
          )}
        </section>

        {analysis && (
          <section className="results-grid">
            <ResultCard title="Extracted Skills" items={analysis.extractedSkills} />
            <ResultCard title="Strengths" items={analysis.strengths} />
            <ResultCard title="Weaknesses" items={analysis.weaknesses} />
            <ResultCard title="Suggestions" items={analysis.suggestions} />
            <ResultCard title="Missing Sections" items={analysis.missingSections} />

            <section className="panel fit-panel">
              <div className="panel-heading">
                <div>
                  <p className="section-label">Role Fit</p>
                  <h2>Target role alignment</h2>
                </div>
              </div>
              <p className="fit-text">{analysis.jobRoleFit}</p>
            </section>
          </section>
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ResultCard({ title, items }) {
  return (
    <section className="panel result-card">
      <div className="panel-heading compact">
        <div>
          <p className="section-label">{title}</p>
          <h2>{title}</h2>
        </div>
      </div>

      <ul className="result-list">
        {items?.length ? (
          items.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li className="muted">No data found</li>
        )}
      </ul>
    </section>
  );
}

export default App;