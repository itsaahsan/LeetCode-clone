import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb, Code } from 'lucide-react';

const ProblemDescription = ({ problem }) => {
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  if (!problem) return null;

  const nextHint = () => {
    if (currentHintIndex < problem.hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    }
  };

  const prevHint = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex(currentHintIndex - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {problem.id}. {problem.title}
        </h1>
        <div className="flex items-center space-x-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            problem.difficulty.toLowerCase() === 'easy' 
              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
              : problem.difficulty.toLowerCase() === 'medium'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
          }`}>
            {problem.difficulty}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Acceptance: {problem.acceptance}%
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Description
        </h2>
        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {problem.description}
        </div>
      </div>

      {problem.examples.map((example, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
            Example {index + 1}:
          </h3>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-4 space-y-2 border border-gray-200 dark:border-gray-700">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Input:</span>
              <code className="ml-2 text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {example.input}
              </code>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Output:</span>
              <code className="ml-2 text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                {example.output}
              </code>
            </div>
            {example.explanation && (
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Explanation:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{example.explanation}</span>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="mb-6">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Constraints:
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300 text-sm">
              {constraint}
            </li>
          ))}
        </ul>
      </div>

      {/* Hints Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
        >
          <Lightbulb className="h-4 w-4" />
          <span>Hints</span>
          {showHint ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {showHint && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
            <div className="mb-3">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {problem.hints[currentHintIndex]}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <button
                  onClick={prevHint}
                  disabled={currentHintIndex === 0}
                  className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={nextHint}
                  disabled={currentHintIndex === problem.hints.length - 1}
                  className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Hint
                </button>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentHintIndex + 1} of {problem.hints.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Solution Section */}
      <div className="mb-6">
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-medium"
        >
          <Code className="h-4 w-4" />
          <span>Show Solution</span>
          {showSolution ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        
        {showSolution && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
            <div className="mb-3">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Optimal Solution:
              </h4>
              <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-x-auto">
                <code className="text-gray-800 dark:text-gray-200">
                  {problem.solutions.javascript}
                </code>
              </pre>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              <p><strong>Time Complexity:</strong> O(n)</p>
              <p><strong>Space Complexity:</strong> O(n)</p>
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Topics:
        </h3>
        <div className="flex flex-wrap gap-2">
          {problem.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
