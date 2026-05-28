const fs = require("fs");
const extractText = require("../utils/extractText");
const analyzeResumeWithAI = require("../utils/aiAnalyzer");
const ResumeAnalysis = require("../models/ResumeAnalysis");

const uploadAndAnalyzeResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const resumeText = await extractText(file.path, file.mimetype);
    const aiResult = await analyzeResumeWithAI(resumeText);

    const analysis = await ResumeAnalysis.create({
      fileName: file.originalname,
      resumeText,
      atsScore: aiResult.atsScore,
      extractedSkills: aiResult.extractedSkills,
      strengths: aiResult.strengths,
      weaknesses: aiResult.weaknesses,
      suggestions: aiResult.suggestions,
      missingSections: aiResult.missingSections,
      jobRoleFit: aiResult.jobRoleFit,
    });

    fs.unlinkSync(file.path);

    res.status(201).json({
      message: "Resume analyzed successfully",
      analysis,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Resume analysis failed",
      error: error.message,
    });
  }
};

const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await ResumeAnalysis.find().sort({ createdAt: -1 });
    res.json(analyses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
      error: error.message,
    });
  }
};

module.exports = {
  uploadAndAnalyzeResume,
  getAllAnalyses,
};