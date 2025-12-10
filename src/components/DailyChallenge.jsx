import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Zap, CheckCircle } from 'lucide-react';
import { getDailyChallenge, isDailyChallengeCompleted } from '../utils/storage';
import { getProblemById } from '../data/problems';

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [problem, setProblem] = useState(null);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const dailyChallenge = getDailyChallenge();
    setChallenge(dailyChallenge);
    
    if (dailyChallenge) {
      const prob = getProblemById(dailyChallenge.problemId);
      setProblem(prob);
      setCompleted(isDailyChallengeCompleted());
    }
  }, []);

  if (!challenge || !problem) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Daily Challenge</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {problem.title}
            </p>
            <div className="flex items-center space-x-3">
              <span className={`text-xs font-bold px-2 py-1 rounded ${
                problem.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                problem.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
              }`}>
                {problem.difficulty}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>Today</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          {completed ? (
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-semibold">Completed</span>
            </div>
          ) : (
            <Link
              to={`/problem/${problem.id}`}
              className="btn-primary text-sm"
            >
              Solve Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
