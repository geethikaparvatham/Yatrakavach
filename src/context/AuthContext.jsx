import { createContext, useContext, useState } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

// Helper to get registered users from localStorage
const getRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem('yk_users') || '[]');
  } catch {
    return [];
  }
};

// Helper to save registered users to localStorage
const saveRegisteredUsers = (users) => {
  localStorage.setItem('yk_users', JSON.stringify(users));
};

export function AuthProvider({ children }) {
  // Try to restore session from localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('yk_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('yk_current_user');
  });

  // Register a new user
  const register = (userData) => {
    const users = getRegisteredUsers();
    const newUser = {
      id: 'usr_' + Date.now(),
      fullName: userData.fullName,
      email: userData.email,
      mobile: userData.mobile,
      city: userData.city,
      language: userData.language || 'English',
      avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
    };
    users.push(newUser);
    saveRegisteredUsers(users);

    // Auto login after register
    localStorage.setItem('yk_current_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  // Login: look up by phone or email in registered users, fallback to mock
  const login = (identifier = '', password = '') => {
    const users = getRegisteredUsers();
    const found = users.find(
      u => u.mobile === identifier || u.email === identifier
    );
    const loggedInUser = found || mockUser;
    localStorage.setItem('yk_current_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setIsAuthenticated(true);
    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem('yk_current_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (updated) => {
    const newUser = { ...user, ...updated };
    localStorage.setItem('yk_current_user', JSON.stringify(newUser));
    // Also update in registered users list
    const users = getRegisteredUsers();
    const idx = users.findIndex(u => u.id === newUser.id);
    if (idx !== -1) {
      users[idx] = newUser;
      saveRegisteredUsers(users);
    }
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
