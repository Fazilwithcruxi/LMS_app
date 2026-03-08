const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/course_db';

const sampleCourses = [
    {
        title: 'Advanced Full-Stack Web Development',
        description: 'Master modern full-stack web development using React, Node.js, and MongoDB. Build production-ready scalable applications from scratch.',
        instructorId: new mongoose.Types.ObjectId(),
        price: 99.99,
        category: 'Development',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        lessons: [
            { title: 'Introduction to React', content: 'Understanding components and props.', order: 1 },
            { title: 'State Management', content: 'Managing state with hooks.', order: 2 }
        ]
    },
    {
        title: 'UI/UX Masterclass: Designing for Humans',
        description: 'Learn the principles of user-centered design, prototyping in Figma, and creating beautiful, intuitive interfaces.',
        instructorId: new mongoose.Types.ObjectId(),
        price: 79.99,
        category: 'Design',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        lessons: [
            { title: 'Design Principles', content: 'Balance, alignment, and contrast.', order: 1 },
            { title: 'Figma Basics', content: 'Creating vectors and components.', order: 2 }
        ]
    },
    {
        title: 'Data Science & Machine Learning Bootcamp',
        description: 'Dive deep into data analytics, Python programming, and foundational machine learning algorithms. Real-world projects included.',
        instructorId: new mongoose.Types.ObjectId(),
        price: 129.99,
        category: 'Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80',
        lessons: [
            { title: 'Python Refresher', content: 'Variables, loops, and functions.', order: 1 },
            { title: 'Intro to Pandas', content: 'Data manipulation and cleaning.', order: 2 }
        ]
    },
    {
        title: 'Cloud Computing Architecture on AWS',
        description: 'Become an expert in architecting highly available, cost-effective, and secure applications on Amazon Web Services.',
        instructorId: new mongoose.Types.ObjectId(),
        price: 149.99,
        category: 'Cloud',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        lessons: [
            { title: 'AWS Core Services', content: 'EC2, S3, and RDS.', order: 1 },
            { title: 'Networking Fundamentals', content: 'VPCs and Subnets.', order: 2 }
        ]
    },
    {
        title: 'Digital Marketing & SEO Strategies',
        description: 'Grow your business relying on proven digital marketing tactics, SEO optimization, and social media advertising.',
        instructorId: new mongoose.Types.ObjectId(),
        price: 59.99,
        category: 'Marketing',
        thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
        lessons: [
            { title: 'SEO Basics', content: 'Keywords and meta tags.', order: 1 },
            { title: 'Social Media Advertising', content: 'Creating Facebook campaigns.', order: 2 }
        ]
    }
];

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('Connected to DB. Seeding courses...');
        await Course.deleteMany({});
        await Course.insertMany(sampleCourses);
        console.log('Sample courses successfully seeded!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Error seeding DB:', err);
        process.exit(1);
    });
