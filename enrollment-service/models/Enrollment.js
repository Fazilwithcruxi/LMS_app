const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    enrolledAt: { type: Date, default: Date.now },
    progress: {
        completedLessons: [{ type: mongoose.Schema.Types.ObjectId }],
        percentage: { type: Number, default: 0 },
    },
    status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
