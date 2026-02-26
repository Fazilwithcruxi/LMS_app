const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// Service URLs
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://auth-service:3001';
const COURSE_SERVICE_URL = process.env.COURSE_SERVICE_URL || 'http://course-service:3002';
const ENROLLMENT_SERVICE_URL = process.env.ENROLLMENT_SERVICE_URL || 'http://enrollment-service:3003';
const ASSESSMENT_SERVICE_URL = process.env.ASSESSMENT_SERVICE_URL || 'http://assessment-service:3004';

// Proxy Routes
app.use('/api/auth', createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' },
}));

app.use('/api/courses', createProxyMiddleware({
    target: COURSE_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/courses': '' },
}));

app.use('/api/enrollments', createProxyMiddleware({
    target: ENROLLMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/enrollments': '' },
}));

app.use('/api/assessments', createProxyMiddleware({
    target: ASSESSMENT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/assessments': '' },
}));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API Gateway is running' });
});

// JSON parsing only for non-proxy routes
app.use(express.json());

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
});
