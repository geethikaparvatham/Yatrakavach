import { createContext, useContext, useState } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export const FEMALE_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
];

export const MALE_AVATARS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
];

export const getDefaultAvatar = (gender) => {
  const pool = (gender === 'Female' || gender === 'female') ? FEMALE_AVATARS : MALE_AVATARS;
  return pool[Math.floor(Math.random() * pool.length)];
};

const getRegisteredUsers = () => {
  try { return JSON.parse(localStorage.getItem('yk_users') || '[]'); } catch { return []; }
};

const saveRegisteredUsers = (users) => {
  localStorage.setItem('yk_users', JSON.stringify(users));
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('yk_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('yk_current_user');
  });

  const register = (userData) => {
    const users = getRegisteredUsers();
    const gender = userData.gender || 'Female';
    const avatar = userData.avatar || getDefaultAvatar(gender);
    const newUser = {
      id: 'usr_' + Date.now(),
      fullName: userData.fullName,
      email: userData.email,
      mobile: userData.mobile,
      city: userData.city,
      language: userData.language || 'English',
      gender: gender,
      avatar: avatar,
    };
    users.push(newUser);
    saveRegisteredUsers(users);
    localStorage.setItem('yk_current_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
    return newUser;
  };

  const login = (identifier = '', password = '') => {
    const users = getRegisteredUsers();
    const found = users.find(u => u.mobile === identifier || u.email === identifier);
    
    let loggedInUser;
    if (found) {
      loggedInUser = found;
    } else {
      // Fallback: create a user based on identifier if not already saved
      loggedInUser = {
        ...mockUser,
        id: 'usr_guest',
        mobile: identifier.length === 10 ? identifier : mockUser.mobile,
        avatar: getDefaultAvatar('Female'),
      };
    }
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
