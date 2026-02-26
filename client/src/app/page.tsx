'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing-page">
      {/* Navigation */}
      <nav className="nav container">
        <div className="logo">
          <span className="gradient-text">Lumina</span>LMS
        </div>
        <div className="nav-links">
          <Link href="/courses">Courses</Link>
          <Link href="/login" className="btn-secondary">Login</Link>
          <Link href="/signup" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero container">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock Your <span className="gradient-text">Potential</span> with Lumina
          </h1>
          <p className="hero-description">
            Experience the future of education with our premium microservices-driven
            Learning Management System. Designed for instructors and students alike.
          </p>
          <div className="hero-actions">
            <Link href="/signup" className="btn-primary hero-btn">Explore Courses</Link>
            <Link href="/about" className="btn-outline hero-btn">Learn More</Link>
          </div>
        </div>
        <div className="hero-visual">
          {/* A glassmorphic card representing a course */}
          <div className="glass-card course-preview">
            <div className="preview-image"></div>
            <h3>Mastering Microservices</h3>
            <p>12 Lessons • 4.5 Hours</p>
            <div className="preview-footer">
              <span className="price">$49.99</span>
              <button className="btn-primary-sm">Enroll</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features container">
        <div className="feature-grid">
          <div className="feature-card glass-card">
            <div className="icon">🚀</div>
            <h3>Fast Tracking</h3>
            <p>Real-time progress monitoring and instant feedback loops.</p>
          </div>
          <div className="feature-card glass-card">
            <div className="icon">🛡️</div>
            <h3>Secure Path</h3>
            <p>Enterprise-grade security with distributed authentication.</p>
          </div>
          <div className="feature-card glass-card">
            <div className="icon">📊</div>
            <h3>Deep Insights</h3>
            <p>Advanced analytics for both instructors and students.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: radial-gradient(circle at 50% 50%, #1e1e22 0%, #0a0a0c 100%);
        }

        .nav {
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .hero {
          padding: 8rem 0;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-title {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 2rem;
          font-family: var(--font-outfit);
        }

        .hero-description {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }

        .hero-btn {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }

        .btn-outline {
          border: 1px solid var(--glass-border);
          padding: 1rem 2rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          transition: var(--transition);
        }

        .btn-outline:hover {
          background: var(--glass-bg);
          border-color: var(--text-secondary);
        }

        .course-preview {
          padding: 1.5rem;
          width: 350px;
          transform: rotate(5deg);
          animation: float 6s ease-in-out infinite;
        }

        .preview-image {
          height: 200px;
          background: var(--accent-gradient);
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
        }

        .preview-footer {
          margin-top: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .features {
          padding-bottom: 8rem;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .feature-card {
          padding: 2.5rem;
          text-align: center;
          transition: var(--transition);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-primary);
        }

        .icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        @keyframes float {
          0%, 100% { transform: rotate(5deg) translateY(0); }
          50% { transform: rotate(5deg) translateY(-20px); }
        }

        @media (max-width: 968px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
            padding: 4rem 0;
          }
          .hero-description {
            margin: 0 auto 3rem;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-visual {
            display: none;
          }
          .feature-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
