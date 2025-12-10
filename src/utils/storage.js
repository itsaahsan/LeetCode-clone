// User progress and data persistence utilities
import { getProblemById } from '../data/problems';

const STORAGE_KEYS = {
  USER_PROGRESS: 'leetcode_clone_progress',
  SUBMISSIONS: 'leetcode_clone_submissions',
  USER_PREFERENCES: 'leetcode_clone_preferences',
  DAILY_CHALLENGE: 'leetcode_clone_daily_challenge',
  PROBLEM_NOTES: 'leetcode_clone_problem_notes',
  FAVORITES: 'leetcode_clone_favorites'
};

// User Progress Management
export const getUserProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
    return data ? JSON.parse(data) : getDefaultProgress();
  } catch (error) {
    console.error('Error loading user progress:', error);
    return getDefaultProgress();
  }
};

export const saveUserProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
};

export const markProblemSolved = (problemId, language, runtime = 'N/A', memory = 'N/A') => {
  const progress = getUserProgress();
  
  if (!progress.solvedProblems.some(p => p.id === problemId)) {
    progress.solvedProblems.push({
      id: problemId,
      solvedAt: new Date().toISOString(),
      language,
      runtime,
      memory
    });
  }
  
  progress.attemptedProblems = progress.attemptedProblems.filter(p => p.id !== problemId);
  updateStreak(progress);
  saveUserProgress(progress);
  saveSubmission(problemId, language, 'Accepted', runtime, memory);
};

export const markProblemAttempted = (problemId) => {
  const progress = getUserProgress();
  
  if (!progress.solvedProblems.some(p => p.id === problemId) && 
      !progress.attemptedProblems.some(p => p.id === problemId)) {
    progress.attemptedProblems.push({
      id: problemId,
      attemptedAt: new Date().toISOString()
    });
  }
  
  saveUserProgress(progress);
};

export const isProblemSolved = (problemId) => {
  const progress = getUserProgress();
  return progress.solvedProblems.some(p => p.id === problemId);
};

export const isProblemAttempted = (problemId) => {
  const progress = getUserProgress();
  return progress.attemptedProblems.some(p => p.id === problemId);
};

// Submission History
export const saveSubmission = (problemId, language, status, runtime = null, memory = null) => {
  try {
    const submissions = getSubmissions();
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newSubmission = {
      id: uniqueId,
      problemId,
      language,
      status,
      runtime: runtime || `${Math.floor(Math.random() * 100 + 50)}ms`,
      memory: memory || `${Math.floor(Math.random() * 20 + 10)}MB`,
      timestamp: new Date().toISOString()
    };
    
    submissions.unshift(newSubmission);
    
    if (submissions.length > 100) {
      submissions.splice(100);
    }
    
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  } catch (error) {
    console.error('Error saving submission:', error);
  }
};

export const getSubmissions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading submissions:', error);
    return [];
  }
};

export const getSubmissionsByProblem = (problemId) => {
  const submissions = getSubmissions();
  return submissions.filter(sub => sub.problemId === problemId);
};

// Streak Management
const updateStreak = (progress) => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
  
  if (progress.lastActiveDate === today) {
    return;
  } else if (progress.lastActiveDate === yesterday) {
    progress.currentStreak += 1;
    progress.maxStreak = Math.max(progress.maxStreak, progress.currentStreak);
  } else {
    progress.currentStreak = 1;
  }
  
  progress.lastActiveDate = today;
};

export const getStreakData = () => {
  const progress = getUserProgress();
  return {
    current: progress.currentStreak,
    max: progress.maxStreak,
    lastActive: progress.lastActiveDate
  };
};

// User Preferences
export const getUserPreferences = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return data ? JSON.parse(data) : getDefaultPreferences();
  } catch (error) {
    console.error('Error loading preferences:', error);
    return getDefaultPreferences();
  }
};

export const saveUserPreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

// Daily Challenge
export const getDailyChallenge = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE);
    if (!data) return generateNewDailyChallenge();
    
    const challenge = JSON.parse(data);
    const today = new Date().toDateString();
    
    if (challenge.date !== today) {
      return generateNewDailyChallenge();
    }
    
    return challenge;
  } catch (error) {
    console.error('Error loading daily challenge:', error);
    return generateNewDailyChallenge();
  }
};

const generateNewDailyChallenge = () => {
  const problems = [1, 2, 3, 4, 5, 6, 7, 8];
  const randomProblem = problems[Math.floor(Math.random() * problems.length)];
  
  const challenge = {
    date: new Date().toDateString(),
    problemId: randomProblem,
    completed: false,
    completedAt: null
  };
  
  localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify(challenge));
  return challenge;
};

export const completeDailyChallenge = () => {
  const challenge = getDailyChallenge();
  challenge.completed = true;
  challenge.completedAt = new Date().toISOString();
  
  localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify(challenge));
  markProblemSolved(challenge.problemId, 'javascript', 'N/A', 'N/A');
};

export const isDailyChallengeCompleted = () => {
  const challenge = getDailyChallenge();
  return challenge && challenge.completed;
};

// Statistics
export const getUserStats = () => {
  const progress = getUserProgress();
  const submissions = getSubmissions();
  
  const totalSolved = progress.solvedProblems.length;
  const totalAttempted = progress.attemptedProblems.length;
  const totalSubmissions = submissions.length;
  const acceptedSubmissions = submissions.filter(s => s.status === 'Accepted').length;
  
  const acceptanceRate = totalSubmissions > 0 
    ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
    : 0;
  
  const problemsByDifficulty = {
    easy: progress.solvedProblems.filter(p => getProblemDifficulty(p.id) === 'Easy').length,
    medium: progress.solvedProblems.filter(p => getProblemDifficulty(p.id) === 'Medium').length,
    hard: progress.solvedProblems.filter(p => getProblemDifficulty(p.id) === 'Hard').length
  };
  
  return {
    totalSolved,
    totalAttempted,
    totalSubmissions,
    acceptanceRate,
    currentStreak: progress.currentStreak,
    maxStreak: progress.maxStreak,
    problemsByDifficulty
  };
};

// Helper functions
const getDefaultProgress = () => ({
  solvedProblems: [],
  attemptedProblems: [],
  totalSubmissions: 0,
  acceptanceRate: 0,
  currentStreak: 0,
  maxStreak: 0,
  lastActiveDate: null
});

const getDefaultPreferences = () => ({
  theme: 'light',
  fontSize: 14,
  fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace',
  autoSave: true,
  defaultLanguage: 'javascript',
  keybindings: 'default'
});

const getProblemDifficulty = (problemId) => {
  const difficultyMap = {
    1: 'Easy', 2: 'Easy', 3: 'Easy', 4: 'Easy',
    5: 'Medium', 6: 'Medium', 7: 'Medium',
    8: 'Hard'
  };
  return difficultyMap[problemId] || 'Easy';
};

// Clear all data
export const clearAllData = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Problem Notes Management
export const getProblemNotes = (problemId) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROBLEM_NOTES);
    const notes = data ? JSON.parse(data) : {};
    return notes[problemId] || '';
  } catch (error) {
    console.error('Error loading problem notes:', error);
    return '';
  }
};

export const saveProblemNotes = (problemId, notes) => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROBLEM_NOTES);
    const allNotes = data ? JSON.parse(data) : {};
    allNotes[problemId] = notes;
    localStorage.setItem(STORAGE_KEYS.PROBLEM_NOTES, JSON.stringify(allNotes));
  } catch (error) {
    console.error('Error saving problem notes:', error);
  }
};

// Favorites Management
export const getFavorites = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addToFavorites = (problemId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(problemId)) {
      favorites.push(problemId);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error adding to favorites:', error);
  }
};

export const removeFromFavorites = (problemId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(id => id !== problemId);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing from favorites:', error);
  }
};
