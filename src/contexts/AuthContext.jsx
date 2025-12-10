import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('leetcode_clone_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('leetcode_clone_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate authentication - in real app, this would be an API call
      setTimeout(() => {
        // For demo purposes, accept any email/password
        if (email && password) {
          const userData = {
            id: Date.now(),
            email: email,
            username: email.split('@')[0],
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`,
            joinedAt: new Date().toISOString(),
            subscription: 'free'
          };
          
          setUser(userData);
          localStorage.setItem('leetcode_clone_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  const register = (email, password, username) => {
    return new Promise((resolve, reject) => {
      // Simulate registration - in real app, this would be an API call
      setTimeout(() => {
        if (email && password && username) {
          const userData = {
            id: Date.now(),
            email: email,
            username: username,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            avatar: `https://ui-avatars.com/api/?name=${username}&background=random`,
            joinedAt: new Date().toISOString(),
            subscription: 'free'
          };
          
          setUser(userData);
          localStorage.setItem('leetcode_clone_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('All fields are required'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('leetcode_clone_user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('leetcode_clone_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};