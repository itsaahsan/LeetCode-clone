import React from 'react';
import { BarChart3, Medal } from 'lucide-react';

const Leaderboard = () => {
  const leaderboard = [
    { rank: 1, name: 'Alice Johnson', solved: 150, streak: 45 },
    { rank: 2, name: 'Bob Smith', solved: 142, streak: 38 },
    { rank: 3, name: 'Carol White', solved: 138, streak: 35 },
    { rank: 4, name: 'David Brown', solved: 125, streak: 28 },
    { rank: 5, name: 'Eve Davis', solved: 118, streak: 22 }
  ];

  const getMedalColor = (rank) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <BarChart3 className="h-8 w-8 text-green-600" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Leaderboard</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Problems Solved</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Current Streak</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {leaderboard.map((user) => (
              <tr key={user.rank} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Medal className={`h-5 w-5 ${getMedalColor(user.rank)}`} />
                    <span className="font-bold text-gray-900 dark:text-white">{user.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{user.name}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.solved}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.streak}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
