const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    videoUrl: { type: String },
    order: { type: Number, required: true },
});

const CourseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, default: 0 },
    category: { type: String },
    thumbnail: { type: String },
    lessons: [LessonSchema],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);
