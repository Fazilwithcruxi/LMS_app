const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const Enrollment = require('./models/Enrollment');

const app = express();
const PORT = process.env.PORT || 3003;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/enrollment_db';

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to Enrollment DB'))
    .catch(err => console.error('Enrollment DB connection error:', err));

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ service: 'Enrollment Service', status: 'running' });
});

// Enroll in a course
app.post('/enroll', async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        let enrollment = await Enrollment.findOne({ studentId, courseId });
        if (enrollment) return res.status(400).json({ message: 'Student already enrolled in this course' });

        enrollment = new Enrollment({ studentId, courseId });
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(500).json({ message: 'Error enrolling student', error: err.message });
    }
});

// Get student enrollments
app.get('/student/:studentId', async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ studentId: req.params.studentId });
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching enrollments', error: err.message });
    }
});

// Update progress
app.patch('/progress/:id', async (req, res) => {
    try {
        const { lessonId, percentage } = req.body;
        const enrollment = await Enrollment.findById(req.params.id);
        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

        if (lessonId && !enrollment.progress.completedLessons.includes(lessonId)) {
            enrollment.progress.completedLessons.push(lessonId);
        }
        if (percentage !== undefined) {
            enrollment.progress.percentage = percentage;
        }

        await enrollment.save();
        res.status(200).json(enrollment);
    } catch (err) {
        res.status(500).json({ message: 'Error updating progress', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Enrollment Service running on port ${PORT}`);
});
