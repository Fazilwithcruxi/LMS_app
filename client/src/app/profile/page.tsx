'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div className="loading">Loading...</div>;
    if (!user) return null;

    return (
        <div className="profile-container">
            <nav className="nav container">
                <Link href="/dashboard" className="logo">
                    <span className="gradient-text">Lumina</span>LMS
                </Link>
                <div className="nav-links">
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/courses">All Courses</Link>
                    <button onClick={logout} className="btn-secondary">Logout</button>
                </div>
            </nav>

            <main className="profile-content container">
                <div className="profile-header glass-card">
                    <div className="avatar">{user.name.charAt(0)}</div>
                    <div className="user-info">
                        <h1>{user.name}</h1>
                        <p className="email">{user.email}</p>
                        <span className="role-badge">{user.role}</span>
                    </div>
                    <button className="btn-primary">Edit Profile</button>
                </div>

                <div className="profile-grid">
                    <div className="glass-card stats-card">
                        <h3>Learning Activity</h3>
                        <div className="stats-row">
                            <div className="stat-item">
                                <span className="stat-value">12</span>
                                <span className="stat-label">Courses</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">85%</span>
                                <span className="stat-label">Avg. Progress</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">4</span>
                                <span className="stat-label">Certificates</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card settings-card">
                        <h3>Account Settings</h3>
                        <div className="settings-list">
                            <div className="setting-item">
                                <span>Email Notifications</span>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <span>Public Profile</span>
                                <label className="switch">
                                    <input type="checkbox" />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="setting-item">
                                <span>Dark Mode</span>
                                <label className="switch">
                                    <input type="checkbox" defaultChecked disabled />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
                .profile-container {
                    min-height: 100vh;
                    background: radial-gradient(circle at 50% 50%, #1e1e22 0%, #0a0a0c 100%);
                    padding-bottom: 4rem;
                }

                .nav {
                    height: 80px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--glass-border);
                    margin-bottom: 3rem;
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

                .profile-content {
                    max-width: 900px !important;
                }

                .profile-header {
                    padding: 3rem;
                    display: flex;
                    align-items: center;
                    gap: 3rem;
                    margin-bottom: 2rem;
                    animation: fadeIn 0.8s ease-out;
                }

                .avatar {
                    width: 120px;
                    height: 120px;
                    background: var(--accent-gradient);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    font-weight: 800;
                    color: white;
                    box-shadow: 0 0 30px rgba(111, 66, 245, 0.4);
                }

                .user-info h1 {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                    font-family: var(--font-outfit);
                }

                .email {
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                }

                .role-badge {
                    background: var(--glass-bg);
                    padding: 0.5rem 1rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border: 1px solid var(--glass-border);
                }

                .profile-header .btn-primary {
                    margin-left: auto;
                }

                .profile-grid {
                    display: grid;
                    grid-template-columns: 1.5fr 1fr;
                    gap: 2rem;
                    animation: slideUp 0.8s ease-out;
                }

                .stats-card, .settings-card {
                    padding: 2rem;
                }

                .stats-card h3, .settings-card h3 {
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                    font-family: var(--font-outfit);
                }

                .stats-row {
                    display: flex;
                    justify-content: space-between;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-value {
                    display: block;
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--accent-primary);
                }

                .stat-label {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                }

                .settings-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .setting-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                /* Switch Styles */
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 24px;
                }

                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }

                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--glass-border);
                    transition: .4s;
                    border-radius: 34px;
                }

                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }

                input:checked + .slider {
                    background-color: var(--accent-primary);
                }

                input:checked + .slider:before {
                    transform: translateX(20px);
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 868px) {
                    .profile-header {
                        flex-direction: column;
                        text-align: center;
                        gap: 1.5rem;
                    }
                    .profile-header .btn-primary {
                        margin-left: 0;
                    }
                    .profile-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
