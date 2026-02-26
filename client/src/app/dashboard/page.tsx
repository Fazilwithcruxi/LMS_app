'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) return <div className="loading">Loading...</div>;

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <aside className="sidebar glass-card">
                <div className="logo-section">
                    <span className="gradient-text">Lumina</span>LMS
                </div>
                <nav className="side-nav">
                    <Link href="/dashboard" className="nav-item active">Overview</Link>
                    <Link href="/courses" className="nav-item">My Courses</Link>
                    <Link href="/profile" className="nav-item">Profile</Link>
                    {user.role === 'instructor' && (
                        <Link href="/courses/create" className="nav-item instructor-action">Create Course</Link>
                    )}
                </nav>
                <button onClick={logout} className="logout-btn">Logout</button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="dashboard-header">
                    <h1>Welcome, {user.name}</h1>
                    <div className="user-badge">{user.role}</div>
                </header>

                <section className="stats-grid">
                    <div className="stat-card glass-card">
                        <h3>Courses Enrolled</h3>
                        <div className="stat-value">0</div>
                    </div>
                    <div className="stat-card glass-card">
                        <h3>Progress</h3>
                        <div className="stat-value">0%</div>
                    </div>
                    <div className="stat-card glass-card">
                        <h3>Achievements</h3>
                        <div className="stat-value">🏆</div>
                    </div>
                </section>

                <section className="content-section">
                    <h2>Recent Activity</h2>
                    <div className="glass-card empty-state">
                        <p>No activity yet. Start your journey today!</p>
                        <Link href="/courses" className="btn-primary">Browse Courses</Link>
                    </div>
                </section>
            </main>

            <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
        }

        .sidebar {
          width: 280px;
          margin: 1rem;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 2rem);
        }

        .logo-section {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 3rem;
        }

        .side-nav {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex-grow: 1;
        }

        .nav-item {
          padding: 1rem;
          border-radius: var(--radius-sm);
          transition: var(--transition);
          font-weight: 500;
        }

        .nav-item:hover, .nav-item.active {
          background: var(--glass-bg);
          color: var(--accent-primary);
        }

        .instructor-action {
          border: 1px dashed var(--accent-primary);
          margin-top: 1rem;
        }

        .logout-btn {
          margin-top: auto;
          color: var(--text-muted);
          text-align: left;
          font-size: 0.9rem;
        }

        .main-content {
          flex-grow: 1;
          padding: 3rem;
          overflow-y: auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .user-badge {
          background: var(--glass-bg);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          text-transform: capitalize;
          font-size: 0.8rem;
          border: 1px solid var(--glass-border);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          padding: 2rem;
          text-align: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--accent-primary);
          margin-top: 1rem;
        }

        .empty-state {
          padding: 5rem;
          text-align: center;
          margin-top: 1.5rem;
        }

        .empty-state p {
          margin-bottom: 2rem;
          color: var(--text-secondary);
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
