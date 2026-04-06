const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
    "http://localhost:5173",
    "https://job-prep-server-kappa.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (Postman, browser direct access)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("CORS not allowed from this origin"));
    },
    credentials: true
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