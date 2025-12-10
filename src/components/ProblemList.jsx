import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, Clock, User, TrendingUp, Award, Heart, Zap } from 'lucide-react';
import DailyChallenge from './DailyChallenge';
import { getAllProblems } from '../data/problems';
import { getUserStats, isProblemSolved, isProblemAttempted, getFavorites, addToFavorites, removeFromFavorites } from '../utils/storage';

const ProblemList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const problems = getAllProblems();
  const allTags = [...new Set(problems.flatMap(p => p.tags))].sort();

  useEffect(() => {
    setUserStats(getUserStats());
    setFavorites(getFavorites());
  }, []);

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || 
                             problem.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => problem.tags.includes(tag));
    return matchesSearch && matchesDifficulty && matchesTags;
  });

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getProblemStatus = (problemId) => {
    if (isProblemSolved(problemId)) return 'solved';
    if (isProblemAttempted(problemId)) return 'attempted';
    return 'unsolved';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'solved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'attempted':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />;
    }
  };

  const toggleFavorite = (problemId) => {
    if (favorites.includes(problemId)) {
      removeFromFavorites(problemId);
      setFavorites(getFavorites());
    } else {
      addToFavorites(problemId);
      setFavorites(getFavorites());
    }
  };

  const isFavorite = (problemId) => favorites.includes(problemId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats */}
      {userStats && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 animate-slide-in">
          {[
            { icon: CheckCircle, label: 'Solved', value: userStats.totalSolved, color: 'bg-green-500' },
            { icon: TrendingUp, label: 'Acceptance', value: `${userStats.acceptanceRate}%`, color: 'bg-blue-500' },
            { icon: Award, label: 'Streak', value: `${userStats.currentStreak}d`, color: 'bg-purple-500' },
            { icon: User, label: 'Submissions', value: userStats.totalSubmissions, color: 'bg-orange-500' }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <div className={`p-2 rounded w-fit mb-2 ${stat.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Problems</h1>
        <p className="text-gray-600 dark:text-gray-400">Solve coding problems to improve your skills</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-200 dark:border-gray-700 animate-slide-in">
        <div className="flex flex-col space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Difficulty */}
          <div className="flex items-center space-x-3 flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
            {['all', 'easy', 'medium', 'hard'].map(difficulty => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  selectedDifficulty === difficulty
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>

          {/* Tags */}
          <div className="flex items-start space-x-3 flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pt-1">Tags:</span>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Challenge */}
      <div className="mb-8">
        <DailyChallenge />
      </div>

      {/* Problems Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Acceptance</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Favorite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProblems.map((problem, index) => {
                const status = getProblemStatus(problem.id);
                return (
                  <tr key={`problem-${problem.id}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">{getStatusIcon(status)}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/problem/${problem.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${
                        problem.difficulty === 'Easy' ? 'text-green-600' :
                        problem.difficulty === 'Medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{problem.acceptance}%</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.map(tag => (
                          <span key={tag} className="badge-success text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFavorite(problem.id)}
                        className={`transition-colors ${isFavorite(problem.id) ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      >
                        <Heart className={`h-5 w-5 ${isFavorite(problem.id) ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredProblems.length === 0 && (
        <div className="text-center py-12">
          <Zap className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">No problems found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProblemList;
