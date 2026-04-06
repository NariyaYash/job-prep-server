const { GoogleGenAI } = require('@google/genai');
const { z, json } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY
})

// const intervireReportSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
  const prompt = `Generate a detailed interview report in JSON format.

### INPUT DATA:
Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

### OUTPUT CONSTRAINTS:
1. **Technical Questions**: Provide at least 4 detailed questions.
2. **Behavioral Questions**: Provide at least 4 detailed questions.
3. **Preparation Plan**: Provide a full 7-day plan (Day 1 to Day 7).
4. **Tasks**: Each day in the plan must include at least 3 specific tasks.
5. **Format**: Return ONLY valid JSON. No conversational text.

### JSON STRUCTURE:
{
  "matchScore": number,
  "title": string,
  "technicalQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "behavioralQuestions": [
    { "question": string, "intention": string, "answer": string }
  ],
  "skillGaps": [
    { "skill": string, "severity": "low" | "medium" | "high" }
  ],
  "preparationPlan": [
    {
      "day": number, 
      "focus": string,
      "tasks": [string, string, string] 
    }
  ]
}

Strictly follow the severity enum and the day-wise structure. Do not include markdown code blocks or any text outside the JSON object.
`
  try {
    const res = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
      }
    });
    console.log(res.text)
    const parsed = JSON.parse(res.text);
    console.log("parsed : ", parsed)

    return parsed;

  } catch (error) {
    console.error("ERROR:", error);
    return null;
  }
}

module.exports = generateInterviewReport;
