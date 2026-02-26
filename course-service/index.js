const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const Course = require('./models/Course');

const app = express();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/course_db';

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to Course DB'))
    .catch(err => console.error('Course DB connection error:', err));

// Routes
app.get('/health', (req, res) => {
    res.status(200).json({ service: 'Course Service', status: 'running' });
});

// Get all courses
app.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching courses', error: err.message });
    }
});

// Get single course
app.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching course', error: err.message });
    }
});

// Create course (Instructor only - role check should be at gateway or via middleware)
app.post('/', async (req, res) => {
    try {
        const { title, description, instructorId, price, category, thumbnail, lessons } = req.body;
        const newCourse = new Course({ title, description, instructorId, price, category, thumbnail, lessons });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(500).json({ message: 'Error creating course', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Course Service running on port ${PORT}`);
});
