const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();


app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Backend is running successfully"
    });
});

// Routes
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;