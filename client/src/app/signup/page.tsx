'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const res = await signup(name, email, password, role);
        if (res.token) {
            router.push('/dashboard');
        } else {
            setError(res.message || 'Signup failed');
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container glass-card">
                <h1 className="gradient-text">Join Lumina</h1>
                <p className="auth-subtitle">Create your account and start learning</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>I am a...</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="auth-select"
                        >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary auth-btn">Create Account</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link href="/login" className="gradient-text">Login</Link>
                </p>
            </div>

            <style jsx>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 50%, #1e1e22 0%, #0a0a0c 100%);
          padding: 2rem;
        }

        .auth-container {
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-family: var(--font-outfit);
        }

        .auth-subtitle {
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }

        .auth-form {
          text-align: left;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          font-size: 0.9rem;
        }

        input, .auth-select {
          width: 100%;
          padding: 0.8rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: white;
          outline: none;
          transition: var(--transition);
        }

        .auth-select option {
          background: var(--bg-secondary);
          color: white;
        }

        input:focus, .auth-select:focus {
          border-color: var(--accent-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .auth-btn {
          width: 100%;
          margin-top: 1rem;
          padding: 1rem;
        }

        .error-message {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.8rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .auth-footer {
          margin-top: 2rem;
          color: var(--text-secondary);
        }
      `}</style>
        </main>
    );
}
