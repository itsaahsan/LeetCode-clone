import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserStats } from '../utils/storage';
import { User, Mail, Calendar, Trophy } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setStats(getUserStats());
  }, []);

  if (!user || !stats) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8">
        <div className="flex items-center space-x-6 mb-8">
          <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
              <p className="font-medium text-gray-900 dark:text-white">{new Date(user.joinedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <span>Statistics</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSolved}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Acceptance Rate</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.acceptanceRate}%</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Submissions</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalSubmissions}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Streak</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.currentStreak}d</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
