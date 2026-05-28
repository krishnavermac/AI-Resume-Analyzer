const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const analyzeResumeWithAI = async (resumeText) => {
  const prompt = `
You are an expert ATS resume analyzer.

Analyze the resume and return ONLY valid JSON.
No markdown. No explanation.

{
  "atsScore": 0,
  "extractedSkills": [],
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "missingSections": [],
  "jobRoleFit": ""
}

Resume text:
${resumeText}
`;

  const completion = await client.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.2,
  });

  const text = completion.choices[0].message.content;

  return JSON.parse(text.replace(/```json/g, "").replace(/```/g, "").trim());
};

module.exports = analyzeResumeWithAI;