import React, { useState } from 'react';
import { useAuth, SEED_PERSONAS } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export function LoginPage({ onLoginSuccess }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('yuvraj.v');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    setError('');
    setIsSubmitting(true);
    const result = await login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left Column: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="max-w-sm w-full space-y-6">
          <div className="space-y-1.5">
            <div className="w-8 h-8 rounded bg-accent text-accent-fg font-semibold text-sm flex items-center justify-center mb-4">
              E
            </div>
            <h1 className="text-2xl font-semibold text-text tracking-tight">Sign in to EPSM</h1>
            <p className="text-xs text-text-muted">
              Enterprise Project &amp; Service Management Platform
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-input bg-status-danger-bg text-status-danger text-xs border border-status-danger/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-text uppercase tracking-[0.06em] mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="yuvraj.v"
                required
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text uppercase tracking-[0.06em] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 bg-surface border border-border rounded-input text-sm text-text focus:border-accent outline-hidden"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || !username.trim()}
              className="w-full"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign in'}
            </Button>
          </form>

          {/* Quick Persona Selector for Testing */}
          <div className="pt-4 border-t border-border">
            <span className="block text-xs uppercase tracking-[0.06em] text-text-faint mb-2">
              Or sign in as persona
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {SEED_PERSONAS.map((p) => (
                <button
                  key={p.username}
                  type="button"
                  onClick={() => {
                    setUsername(p.username);
                    setPassword('password');
                  }}
                  className={`text-left p-2 rounded-input border border-border text-xs transition ${
                    username === p.username
                      ? 'border-accent bg-bg-subtle text-text font-semibold'
                      : 'text-text-muted hover:border-border-strong hover:text-text'
                  }`}
                >
                  <div className="truncate font-semibold">{p.name}</div>
                  <div className="text-[10px] text-text-faint truncate">{p.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Quiet Brand Panel */}
      <div className="hidden lg:flex w-1/2 bg-bg-subtle border-l border-border flex-col justify-between p-12">
        <div className="text-xs uppercase tracking-[0.06em] text-text-faint font-semibold">
          System Overview
        </div>
        <div className="space-y-4 max-w-md">
          <blockquote className="text-base text-text font-normal leading-relaxed">
            &ldquo;A unified platform for software engineering squads, service desk SLA governance, and change management approvals.&rdquo;
          </blockquote>
          <div className="text-xs text-text-muted">
            Spring Boot 3 pure ORM backend &bull; React &amp; Tailwind design system
          </div>
        </div>
        <div className="text-xs text-text-faint">
          Mentorship Core: Puneeth Rajkumar &bull; Yuvraj V
        </div>
      </div>
    </div>
  );
}

