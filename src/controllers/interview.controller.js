const PDF = require('pdf-parse-fork');
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require('../models/interviewReport.model');

async function genrateInterviewReportController(req, res) {

    const { selfDescription, jobDescription } = req.body;
    try {

        // const resumeContent = await (PDF(Uint8Array.from(req.file.buffer))).getText();
        // console.log("resumeContent", resumeContent.text)
        if (!req.file) {
            return res.status(400).json({ message: "No resume file uploaded" });
        }

        // Parse the PDF buffer directly from Multer
        const data = await PDF(req.file.buffer);
        const resumeContent = data.text;

        if (!resumeContent || resumeContent.trim().length === 0) {
            throw new Error("Could not extract text from PDF");
        }

        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAI
        })

        res.status(201).json({
            message: "Interview report genrate succesfully.",
            interviewReport
        })
    } catch (error) {
        console.log("Error", error)
        res.status(400).json({
            message: "Interview report not genrated"
        })
    }

}

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params;
    try {
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        res.status(200).json({
            message: "Interview report found.",
            interviewReport
        });
    } catch (error) {
        console.log("Error", error)
        res.status(400).json({
            message: "Error fetching interview report."
        })
    }
}

async function getAllInterviewReportController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions  -behavioralQuestions -skillGaps -preparationPlan");

        res.status(200).json({
            message: "Interview reports found.",
            interviewReports
        });

    } catch (error) {
        console.log("Error", error)
        res.status(400).json({
            message: "Error fetching interview reports."
        })
    }
}

module.exports = { genrateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController }