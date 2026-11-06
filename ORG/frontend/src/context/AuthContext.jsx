import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext();

export const SEED_PERSONAS = [
  {
    name: 'Yuvraj V',
    username: 'yuvraj.v',
    role: 'ROLE_TEAM_MEMBER',
    title: 'Senior Java Backend Engineer (Mentee)',
    department: 'Platform Core',
    mentor: 'Puneeth Rajkumar',
    initials: 'YV',
  },
  {
    name: 'Puneeth Rajkumar',
    username: 'puneeth.rajkumar',
    role: 'ROLE_PROJECT_MANAGER',
    title: 'Project Lead & Lead Architect',
    department: 'Platform Architecture',
    mentor: 'Self / Board',
    initials: 'PR',
  },
  {
    name: 'Yash',
    username: 'yash.cloud',
    role: 'ROLE_TEAM_LEAD',
    title: 'DevOps & Cloud Lead',
    department: 'Cloud Infrastructure',
    mentor: 'Puneeth Rajkumar',
    initials: 'YS',
  },
  {
    name: 'Rishab Shetty',
    username: 'rishab.shetty',
    role: 'ROLE_SERVICE_AGENT',
    title: 'Security & Service Desk Specialist',
    department: 'Security & Auth',
    mentor: 'Puneeth Rajkumar',
    initials: 'RS',
  },
  {
    name: 'Admin',
    username: 'admin',
    role: 'ROLE_ADMIN',
    title: 'Enterprise Administrator',
    department: 'Executive Administration',
    mentor: 'Board',
    initials: 'AD',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('epsm_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return SEED_PERSONAS[0];
      }
    }
    return SEED_PERSONAS[0]; // Default to Yuvraj V
  });

  const [token, setToken] = useState(() => localStorage.getItem('epsm_jwt_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('epsm_user')));

  useEffect(() => {
    if (user) {
      localStorage.setItem('epsm_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('epsm_user');
    }
  }, [user]);

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('epsm:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('epsm:unauthorized', handleUnauthorized);
  }, []);

  const login = async (username, password) => {
    try {
      const res = await api.post('/auth/login', { username, password });
      if (res.data && res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('epsm_jwt_token', res.data.token);
        const matched = SEED_PERSONAS.find(p => p.username === username) || {
          name: username,
          username,
          role: res.data.role || 'ROLE_TEAM_MEMBER',
          title: 'Team Member',
          department: 'Platform Core',
          initials: username.substring(0, 2).toUpperCase(),
        };
        setUser(matched);
        setIsAuthenticated(true);
        return { success: true };
      }
    } catch {
      // Fallback for offline demo
      const matched = SEED_PERSONAS.find(
        p => p.username === username || p.name.toLowerCase() === username.toLowerCase()
      );
      if (matched) {
        setUser(matched);
        setIsAuthenticated(true);
        return { success: true, offline: true };
      }
      return { success: false, error: 'Invalid username or password' };
    }
    return { success: false, error: 'Authentication failed' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('epsm_jwt_token');
    localStorage.removeItem('epsm_user');
  };

  const switchPersona = (name) => {
    const target = SEED_PERSONAS.find(p => p.name === name);
    if (target) {
      setUser(target);
      setIsAuthenticated(true);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        switchPersona,
        personas: SEED_PERSONAS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}

