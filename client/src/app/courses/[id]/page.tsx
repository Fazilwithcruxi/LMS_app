'use client';

import { useState, useEffect, use } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading } = useAuth();
  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await res.json();
        setCourse(data);

        // Check enrollment if user is logged in
        if (user) {
          const enrollRes = await fetch(`http://localhost:5000/api/enrollments/student/${user.id}`);
          const enrollments = await enrollRes.json();
          const enrolled = enrollments.some((e: any) => e.courseId === id);
          setIsEnrolled(enrolled);
        }
      } catch (err) {
        console.error('Error fetching course:', err);
      } finally {
        setFetching(false);
      }
    };
    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setIsEnrolling(true);
    try {
      const res = await fetch('http://localhost:5000/api/enrollments/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: user.id, courseId: id }),
      });
      if (res.ok) {
        setIsEnrolled(true);
      }
    } catch (err) {
      console.error('Error enrolling:', err);
    } finally {
      setIsEnrolling(false);
    }
  };

  if (loading || fetching) return <div className="loading">Loading details...</div>;
  if (!course) return <div className="error-container">Course not found.</div>;

  return (
    <div className="detail-page">
      <nav className="catalog-nav container">
        <Link href="/courses" className="logo">
          <span className="gradient-text">Lumina</span>LMS
        </Link>
      </nav>

      <main className="container">
        <div className="course-hero">
          <div className="hero-info">
            <span className="course-category">{course.category}</span>
            <h1>{course.title}</h1>
            <p className="description">{course.description}</p>

            <div className="enrollment-status">
              {isEnrolled ? (
                <div className="enrolled-badge">You are enrolled in this course</div>
              ) : (
                <div className="enroll-actions">
                  <span className="price">${course.price}</span>
                  <button
                    className="btn-primary"
                    onClick={handleEnroll}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="hero-banner glass-card" style={{ background: 'var(--accent-gradient)' }}></div>
        </div>

        <section className="curriculum-section">
          <h2>Curriculum</h2>
          <div className="lesson-list">
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson: any, index: number) => (
                <div key={index} className="lesson-item glass-card">
                  <div className="lesson-number">{index + 1}</div>
                  <div className="lesson-title">{lesson.title}</div>
                  {isEnrolled && <Link href={`/courses/${id}/lesson/${index}`} className="btn-outline-sm">Start</Link>}
                </div>
              ))
            ) : (
              <div className="glass-card empty-lessons">
                <p>Curriculum is being updated. Stay tuned!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx>{`
        .detail-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-bottom: 5rem;
        }

        .catalog-nav {
          height: 80px;
          display: flex;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .course-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          padding: 4rem 0;
          align-items: center;
        }

        .course-category {
          color: var(--accent-primary);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        h1 {
          font-size: 3.5rem;
          font-family: var(--font-outfit);
          margin: 1rem 0;
          line-height: 1.1;
        }

        .description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }

        .hero-banner {
          height: 400px;
        }

        .enrollment-status {
          margin-top: 2rem;
        }

        .enrolled-badge {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 1rem 2rem;
          border-radius: var(--radius-md);
          display: inline-block;
          font-weight: 600;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .enroll-actions {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .price {
          font-size: 2rem;
          font-weight: 800;
        }

        .curriculum-section {
          margin-top: 4rem;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .lesson-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .lesson-item {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          gap: 1.5rem;
        }

        .lesson-number {
          width: 40px;
          height: 40px;
          background: var(--glass-bg);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          border: 1px solid var(--glass-border);
        }

        .lesson-title {
          font-size: 1.1rem;
          font-weight: 600;
          flex-grow: 1;
        }

        .empty-lessons {
          padding: 3rem;
          text-align: center;
        }

        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .btn-outline-sm {
           border: 1px solid var(--glass-border);
           padding: 0.4rem 1rem;
           border-radius: var(--radius-sm);
           font-size: 0.9rem;
        }

        @media (max-width: 968px) {
          .course-hero {
            grid-template-columns: 1fr;
          }
          .hero-banner {
            order: -1;
            height: 250px;
          }
        }
      `}</style>
    </div>
  );
}
