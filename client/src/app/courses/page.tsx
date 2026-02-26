'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function CourseCatalog() {
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/courses');
        const data = await res.json();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      } finally {
        setFetching(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading || fetching) return <div className="loading">Loading courses...</div>;

  return (
    <div className="catalog-page">
      <nav className="catalog-nav container">
        <Link href="/dashboard" className="logo">
          <span className="gradient-text">Lumina</span>LMS
        </Link>
        <div className="nav-user">
          <span>{user?.name}</span>
        </div>
      </nav>

      <main className="container">
        <header className="catalog-header">
          <h1>Explore <span className="gradient-text">Courses</span></h1>
          <p>Learn from the world's best instructors</p>
        </header>

        <div className="course-grid">
          {courses.length > 0 ? (
            courses.map((course: any) => (
              <div key={course._id} className="course-card glass-card">
                <div className="course-banner" style={{ background: 'var(--accent-gradient)' }}></div>
                <div className="course-info">
                  <span className="course-category">{course.category || 'General'}</span>
                  <h3>{course.title}</h3>
                  <p>{course.description.substring(0, 100)}...</p>
                  <div className="course-footer">
                    <span className="course-price">${course.price}</span>
                    <Link href={`/courses/${course._id}`} className="btn-primary-sm">View Details</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-catalog glass-card">
              <p>No courses available at the moment. Check back later!</p>
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .catalog-page {
          min-height: 100vh;
          background: var(--bg-primary);
          padding-bottom: 5rem;
        }

        .catalog-nav {
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .catalog-header {
          margin: 4rem 0;
          text-align: center;
        }

        h1 {
          font-size: 3.5rem;
          font-family: var(--font-outfit);
        }

        .course-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .course-card {
          overflow: hidden;
          transition: var(--transition);
        }

        .course-card:hover {
          transform: translateY(-8px);
        }

        .course-banner {
          height: 160px;
        }

        .course-info {
          padding: 1.5rem;
        }

        .course-category {
          font-size: 0.75rem;
          color: var(--accent-primary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
        }

        h3 {
          margin: 0.5rem 0 1rem;
          font-size: 1.25rem;
        }

        .course-footer {
          margin-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-border);
        }

        .course-price {
          font-weight: 800;
          font-size: 1.2rem;
        }

        .empty-catalog {
          grid-column: 1 / -1;
          padding: 5rem;
          text-align: center;
        }

        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .btn-primary-sm {
           background: var(--accent-gradient);
           padding: 0.5rem 1rem;
           border-radius: var(--radius-sm);
           font-size: 0.9rem;
           font-weight: 600;
        }
      `}</style>
    </div>
  );
}
