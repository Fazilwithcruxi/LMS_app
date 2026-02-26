'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateCourse() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('0');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user || user.role !== 'instructor') {
    return <div className="error-container">Unauthorized. Only instructors can create courses.</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          category,
          price: parseFloat(price),
          instructorId: user.id,
          lessons: []
        }),
      });

      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Error creating course:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-page">
      <nav className="catalog-nav container">
        <Link href="/dashboard" className="logo">
          <span className="gradient-text">Lumina</span>LMS
        </Link>
      </nav>

      <main className="container narrow">
        <div className="glass-card form-container">
          <h1>Create New <span className="gradient-text">Course</span></h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Title</label>
              <input
                type="text"
                placeholder="e.g. Advanced Microservices Architecture"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="e.g. Technology, Business, Design"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                placeholder="Describe what students will learn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
              />
            </div>

            <div className="form-group">
              <label>Price (USD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                min="0"
              />
            </div>

            <div className="form-actions">
              <Link href="/dashboard" className="btn-outline">Cancel</Link>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Creating...' : 'Launch Course'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        .create-page {
          min-height: 100vh;
          background: var(--bg-primary);
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

        .narrow {
          max-width: 800px;
        }

        .form-container {
          padding: 3rem;
          margin-top: 2rem;
        }

        h1 {
          font-family: var(--font-outfit);
          margin-bottom: 2rem;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        input, textarea {
          width: 100%;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: white;
          outline: none;
          font-family: inherit;
        }

        input:focus, textarea:focus {
          border-color: var(--accent-primary);
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1.5rem;
          margin-top: 1rem;
        }

        .btn-outline {
          border: 1px solid var(--glass-border);
          padding: 0.8rem 1.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
        }

        .loading {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}
