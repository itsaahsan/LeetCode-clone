import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Target, TrendingUp, Calendar, Award, Code, CheckCircle } from 'lucide-react';
import { getUserStats, getStreakData, getSubmissions } from '../utils/storage';

const Dashboard = () => {
  const [userStats, setUserStats] = useState(null);
  const [streakData, setStreakData] = useState(null);
  const [recentSubmissions, setRecentSubmissions] = useState([]);

  useEffect(() => {
    setUserStats(getUserStats());
    setStreakData(getStreakData());
    const submissions = getSubmissions();
    setRecentSubmissions(submissions.slice(0, 5));
  }, []);

  if (!userStats || !streakData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className={`p-3 rounded w-fit mb-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 animate-slide-in">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h1>
        <p className="text-gray-600 dark:text-gray-400">Track your coding progress and achievements</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Trophy} label="Total Solved" value={userStats.totalSolved} color="bg-yellow-500" />
        <StatCard icon={Target} label="Acceptance Rate" value={`${userStats.acceptanceRate}%`} color="bg-blue-500" />
        <StatCard icon={Calendar} label="Current Streak" value={`${streakData.current}d`} color="bg-green-500" />
        <StatCard icon={Award} label="Max Streak" value={`${streakData.max}d`} color="bg-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Difficulty Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 animate-slide-in">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Code className="h-5 w-5 text-green-600" />
            <span>Problems by Difficulty</span>
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Easy', value: userStats.problemsByDifficulty.easy, color: 'bg-green-500', bg: 'bg-green-100 dark:bg-green-900/20' },
              { label: 'Medium', value: userStats.problemsByDifficulty.medium, color: 'bg-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/20' },
              { label: 'Hard', value: userStats.problemsByDifficulty.hard, color: 'bg-red-500', bg: 'bg-red-100 dark:bg-red-900/20' }
            ].map((item) => (
              <div key={item.label} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className={`px-3 py-1 rounded text-sm font-bold ${item.bg}`}>
                    {item.value}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2 overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-500`}
                    style={{ width: `${(item.value / Math.max(1, userStats.totalSolved)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 animate-slide-in">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Recent Submissions</span>
          </h2>
          <div className="space-y-3">
            {recentSubmissions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400 text-center py-8">No submissions yet. Start solving!</p>
            ) : (
              recentSubmissions.map((submission, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 hover:shadow-md transition-shadow group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${submission.status === 'Accepted' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Problem #{submission.problemId}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{submission.language}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${submission.status === 'Accepted' ? 'badge-success' : 'badge-error'}`}>
                      {submission.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Achievement Banner */}
      <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800 animate-slide-in">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-green-600 rounded">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Keep Going!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {userStats.totalSolved === 0 
                ? "Start your coding journey today!"
                : `You've solved ${userStats.totalSolved} problems. Amazing progress!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
