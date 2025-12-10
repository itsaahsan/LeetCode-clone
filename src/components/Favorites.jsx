import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, Clock } from 'lucide-react';
import { getAllProblems } from '../data/problems';
import { getFavorites, removeFromFavorites, isProblemSolved, isProblemAttempted } from '../utils/storage';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    const fav = getFavorites();
    setFavorites(fav);
    
    const allProblems = getAllProblems();
    const favProblems = allProblems.filter(p => fav.includes(p.id));
    setProblems(favProblems);
  }, []);

  const handleRemoveFavorite = (id) => {
    removeFromFavorites(id);
    setFavorites(getFavorites());
    setProblems(problems.filter(p => p.id !== id));
  };

  const getStatusIcon = (problemId) => {
    if (isProblemSolved(problemId)) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (isProblemAttempted(problemId)) return <Clock className="h-5 w-5 text-yellow-500" />;
    return <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Favorites</h1>

      {problems.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">No favorite problems yet</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Title</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {problems.map((problem) => (
                <tr key={problem.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">{getStatusIcon(problem.id)}</td>
                  <td className="px-6 py-4">
                    <Link to={`/problem/${problem.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
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
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleRemoveFavorite(problem.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Favorites;
