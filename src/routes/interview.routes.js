const { Router } = require('express');
const { authUser } = require('../middleware/auth.middleware');
const { genrateInterviewReportController, getInterviewReportByIdController , getAllInterviewReportController} = require('../controllers/interview.controller')
const upload = require('../middleware/file.middleware')

const interviewRouter = Router()


interviewRouter.post("/", authUser, upload.single("resumeFile"), genrateInterviewReportController)
interviewRouter.get("/report/:interviewId", authUser, getInterviewReportByIdController)
interviewRouter.get("/", authUser, getAllInterviewReportController)



module.exports = interviewRouter