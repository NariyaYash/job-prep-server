const { Behavior } = require('@google/genai');
const mongoose = require('mongoose');

/** 
 * - job Description: text:String
 * - resume text:String
 * - self description: text:String
 * 
 * -matchScore: number
 * -technical questions:[{
 *     question:"",
 *     intention:"",
 *     answer:"",     
 *  }]
 * 
 * -Behavioral questions:[{
 *     question:"",
 *     intention:"",
 *     answer:"",     
 *  }]
 * 
 * -skill gap:[     
 *      skill:"",
 *      severity:{
 *          type:string
 *          enum:["low","medium","high"]
 *    }
 * ]
 * 
 * -perparation plan:[{
 *      day:number,
 *      focus: string,
 *      tasks: [String]
 * }]
 * 
 * 
*/


const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "Technical questions is needed."]
    },
    intention: {
        type: String,
        require: [true, "Intention is needed."]
    },
    answer: {
        type: String,
        require: [true, "Answer is required."]
    }

}, { _id: false })

const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        require: [true, "behavioral questions is needed."]
    },
    intention: {
        type: String,
        require: [true, "Intention is needed."]
    },
    answer: {
        type: String,
        require: [true, "Answer is required."]
    }

}, { _id: false })

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        require: [true, "Skill is needed."]
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        require: [true, "Intention is needed."]
    }
}, { _id: false })

const preprationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        require: [true, "Day is needed."]
    },
    focus: {
        type: String,
        require: [true, "Focus is needed."]
    },
    tasks: [{
        type: String,
        require: [true, "Task is required."]
    }]

}, { _id: false })



const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        require: [true, "JOb description is require!"]
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preprationPlanSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title:{
        type:String,
         require: [true, "Title is require!"]
    }
}, { timestamps: true })

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;