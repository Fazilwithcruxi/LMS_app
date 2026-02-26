const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const { Assessment, Submission } = require('./models/Assessment');

const app = express();
const PORT = process.env.PORT || 3004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/assessment_db';

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to Assessment DB'))
    .catch(err => console.error('Assessment DB connection error:', err));

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ service: 'Assessment Service', status: 'running' });
});

// Create an assessment
app.post('/', async (req, res) => {
    try {
        const { courseId, title, questions } = req.body;
        const assessment = new Assessment({ courseId, title, questions });
        await assessment.save();
        res.status(201).json(assessment);
    } catch (err) {
        res.status(500).json({ message: 'Error creating assessment', error: err.message });
    }
});

// Get assessments for a course
app.get('/course/:courseId', async (req, res) => {
    try {
        const assessments = await Assessment.find({ courseId: req.params.courseId });
        res.status(200).json(assessments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching assessments', error: err.message });
    }
});

// Submit an assessment
app.post('/submit', async (req, res) => {
    try {
        const { assessmentId, studentId, answers } = req.body;
        const assessment = await Assessment.findById(assessmentId);
        if (!assessment) return res.status(404).json({ message: 'Assessment not found' });

        // Calculate score
        let score = 0;
        assessment.questions.forEach((q, index) => {
            if (answers[index] === q.correctOptionIndex) {
                score++;
            }
        });

        const submission = new Submission({
            assessmentId,
            studentId,
            answers,
            score: (score / assessment.questions.length) * 100
        });

        await submission.save();
        res.status(201).json(submission);
    } catch (err) {
        res.status(500).json({ message: 'Error submitting assessment', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Assessment Service running on port ${PORT}`);
});
