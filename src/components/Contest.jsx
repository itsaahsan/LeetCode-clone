import React from 'react';
import { Trophy, Calendar, Users } from 'lucide-react';

const Contest = () => {
  const contests = [
    { id: 1, name: 'Weekly Contest 1', date: '2024-01-15', participants: 1250 },
    { id: 2, name: 'Weekly Contest 2', date: '2024-01-22', participants: 980 },
    { id: 3, name: 'Biweekly Contest 1', date: '2024-01-20', participants: 750 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Trophy className="h-8 w-8 text-yellow-500" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Contests</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest) => (
          <div key={contest.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{contest.name}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{contest.date}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4" />
                <span className="text-sm">{contest.participants} participants</span>
              </div>
            </div>
            <button className="mt-4 btn-primary w-full text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contest;
