const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOptionIndex: { type: Number, required: true },
});

const AssessmentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    questions: [QuestionSchema],
    createdAt: { type: Date, default: Date.now },
});

const SubmissionSchema = new mongoose.Schema({
    assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true },
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true },
    answers: [Number], // Index of selected options
    score: { type: Number },
    submittedAt: { type: Date, default: Date.now },
});

const Assessment = mongoose.model('Assessment', AssessmentSchema);
const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = { Assessment, Submission };
