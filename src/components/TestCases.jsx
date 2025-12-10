import React from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const TestCases = ({ testResults, problem }) => {
  if (!testResults || testResults.length === 0) {
    return (
      <div className="p-8 text-center">
        <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400 opacity-50" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Run your code to see test results</p>
      </div>
    );
  }

  const passedCount = testResults.filter(result => result.passed).length;
  const totalCount = testResults.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="p-4 space-y-4">
      {/* Summary Card */}
      <div className={`bg-white dark:bg-gray-800 rounded p-4 border-l-4 ${allPassed ? 'border-green-500' : 'border-red-500'}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {allPassed ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <span className="font-semibold text-gray-900 dark:text-white">
              {passedCount} / {totalCount} test cases passed
            </span>
          </div>
          <span className={`text-sm font-bold px-3 py-1 rounded ${allPassed ? 'badge-success' : 'badge-error'}`}>
            {allPassed ? 'All Passed!' : `${totalCount - passedCount} Failed`}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-2 overflow-hidden">
          <div 
            className={`h-full ${allPassed ? 'bg-green-500' : 'bg-red-500'} transition-all duration-500`}
            style={{ width: `${(passedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Test Cases */}
      <div className="space-y-3">
        {testResults.map((result, index) => (
          <div 
            key={`${result.input}-${index}`}
            className={`bg-white dark:bg-gray-800 rounded p-4 border-l-4 transition-all hover:shadow-md ${
              result.passed ? 'border-green-500' : 'border-red-500'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {result.passed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  Test Case {index + 1}
                </span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${result.passed ? 'badge-success' : 'badge-error'}`}>
                {result.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Input:</p>
                <pre className="code-block text-xs">
                  {JSON.stringify(result.input, null, 2)}
                </pre>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Expected:</p>
                <pre className="code-block text-xs">
                  {JSON.stringify(result.expected, null, 2)}
                </pre>
              </div>
            </div>
            
            {!result.passed && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Your Output:</p>
                <pre className={`code-block text-xs border-l-4 ${result.error ? 'border-red-500' : 'border-orange-500'}`}>
                  {result.error ? result.actual : JSON.stringify(result.actual, null, 2)}
                </pre>
              </div>
            )}

            {result.consoleOutput && (
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">Console Output:</p>
                <pre className="code-block text-xs bg-gray-900 dark:bg-gray-950">
                  {result.consoleOutput}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      {testResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded p-4 grid grid-cols-2 gap-4 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Runtime</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {(testResults.reduce((sum, r) => sum + r.executionTime, 0) / testResults.length).toFixed(2)}ms
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Avg Memory</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {(testResults.reduce((sum, r) => sum + r.memoryUsage, 0) / testResults.length).toFixed(2)}MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCases;
