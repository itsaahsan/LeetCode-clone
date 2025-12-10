import React from 'react';
import { Lightbulb } from 'lucide-react';

const CodeHints = ({ problem }) => {
  if (!problem || !problem.hints) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 mb-4">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Hints</h3>
      </div>
      {problem.hints.map((hint, index) => (
        <div key={index} className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3">
          <p className="text-xs font-semibold text-yellow-800 dark:text-yellow-400 mb-1">Hint {index + 1}:</p>
          <p className="text-sm text-gray-700 dark:text-gray-300">{hint}</p>
        </div>
      ))}
    </div>
  );
};

export default CodeHints;
