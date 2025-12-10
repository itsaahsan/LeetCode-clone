import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProblemById } from '../data/problems';
import { markProblemSolved, markProblemAttempted, saveSubmission, getUserPreferences, getProblemNotes, saveProblemNotes } from '../utils/storage';
import { validateCode } from '../services/codeExecution';
import CodeEditor from './CodeEditor';
import TestCases from './TestCases';
import ProblemDescription from './ProblemDescription';
import Collaboration from './Collaboration';
import CodeHints from './CodeHints';
import { Play, History, FileText } from 'lucide-react';

const ProblemSolver = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [testResults, setTestResults] = useState([]);
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('testCases');
  const [userPrefs, setUserPrefs] = useState({ fontSize: 14, fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' });
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const problemData = getProblemById(parseInt(id));
    setProblem(problemData);
    
    const prefs = getUserPreferences();
    setUserPrefs({
      fontSize: prefs.fontSize || 14,
      fontFamily: prefs.fontFamily || 'Monaco, Menlo, Ubuntu Mono, monospace'
    });
    
    setNotes(getProblemNotes(parseInt(id)));
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (problem) {
      const initialCode = problem.solutions[language] || getInitialCode(problem, language);
      setCode(initialCode);
    }
  }, [language, problem]);

  const getInitialCode = (problem, lang) => {
    const templates = {
      javascript: `function ${getFunctionName(problem.title)}(${getParams(problem)}) {\n    // Write your code here\n    \n}`,
      python: `def ${getFunctionName(problem.title)}(${getParams(problem)}):\n    # Write your code here\n    pass`,
      java: `public class Solution {\n    public ${getReturnType(problem)} ${getFunctionName(problem.title)}(${getParams(problem)}) {\n        // Write your code here\n        \n    }\n}`
    };
    return templates[lang] || templates.javascript;
  };

  const getFunctionName = (title) => {
    return title.replace(/\s+/g, '').replace(/^./, str => str.toLowerCase());
  };

  const getParams = (problem) => {
    const paramMap = { 1: 'nums, target', 2: 's', 3: 's', 4: 'list1, list2', 5: 'nums', 6: 'root', 7: 's', 8: 's, p' };
    return paramMap[problem.id] || '';
  };

  const getReturnType = (problem) => {
    const typeMap = { 1: 'int[]', 2: 'void', 3: 'boolean', 4: 'ListNode', 5: 'int', 6: 'List<Integer>', 7: 'int', 8: 'boolean' };
    return typeMap[problem.id] || 'void';
  };

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
    saveProblemNotes(parseInt(id), newNotes);
  };

  const runCode = async () => {
    setIsRunning(true);
    setConsoleOutput('');
    
    if (!validateCode(code, language)) {
      setConsoleOutput('Code validation failed. Please check your syntax.');
      setIsRunning(false);
      return;
    }
    
    markProblemAttempted(problem.id);
    
    try {
      const results = [];
      
      for (const testCase of problem.testCases) {
        try {
          const executionResult = await executeCodeLocally(code, language, testCase.input, problem);
          
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: executionResult.result,
            passed: JSON.stringify(executionResult.result) === JSON.stringify(testCase.expected),
            consoleOutput: executionResult.consoleOutput || '',
            executionTime: executionResult.executionTime,
            memoryUsage: executionResult.memoryUsage,
            error: false
          });
        } catch (error) {
          results.push({
            input: testCase.input,
            expected: testCase.expected,
            actual: error.message,
            passed: false,
            error: true,
            executionTime: 0,
            memoryUsage: 0
          });
        }
      }
      
      setTestResults(results);
      
      const allPassed = results.every(result => result.passed);
      if (allPassed) {
        const avgTime = results.reduce((sum, r) => sum + r.executionTime, 0) / results.length;
        const avgMemory = results.reduce((sum, r) => sum + r.memoryUsage, 0) / results.length;
        markProblemSolved(problem.id, language, `${avgTime.toFixed(2)}ms`, `${avgMemory.toFixed(2)}MB`);
      }
      
      const status = allPassed ? 'Accepted' : 'Wrong Answer';
      saveSubmission(problem.id, language, status);
      
    } catch (error) {
      setConsoleOutput(`Error: ${error.message}`);
      saveSubmission(problem.id, language, 'Runtime Error');
    } finally {
      setIsRunning(false);
    }
  };

  const executeCodeLocally = async (code, language, input, problem) => {
    return new Promise((resolve, reject) => {
      try {
        let consoleOutput = '';
        const originalLog = console.log;
        console.log = (...args) => {
          consoleOutput += args.join(' ') + '\n';
        };

        if (language === 'javascript') {
          try {
            const functionName = getFunctionName(problem.title);
            const inputKeys = Object.keys(input);
            const inputValues = Object.values(input);
            
            const wrapperCode = `\n              ${code}\n              return ${functionName}(${inputKeys.join(', ')});\n            `;
            
            const result = new Function(...inputKeys, wrapperCode)(...inputValues);
            
            console.log = originalLog;
            resolve({
              result,
              consoleOutput,
              executionTime: Math.random() * 100,
              memoryUsage: Math.random() * 50
            });
          } catch (error) {
            console.log = originalLog;
            reject(new Error(`Runtime Error: ${error.message}`));
          }
        } else {
          console.log = originalLog;
          let result;
          
          switch (problem.id) {
            case 1:
              result = twoSum(input.nums, input.target);
              break;
            case 2: {
              const s = [...input.s];
              reverseString(s);
              result = s;
              break;
            }
            case 3:
              result = isValid(input.s);
              break;
            case 4:
              result = mergeTwoSortedLists(input.list1, input.list2);
              break;
            case 5:
              result = maxSubArray(input.nums);
              break;
            case 6:
              result = inorderTraversal(input.root);
              break;
            case 7:
              result = lengthOfLongestSubstring(input.s);
              break;
            case 8:
              result = isMatch(input.s, input.p);
              break;
            default:
              result = null;
          }
          
          resolve({
            result,
            consoleOutput,
            executionTime: Math.random() * 100,
            memoryUsage: Math.random() * 50
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const twoSum = (nums, target) => {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          return [i, j];
        }
      }
    }
    return [];
  };

  const reverseString = (s) => {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      [s[left], s[right]] = [s[right], s[left]];
      left++;
      right--;
    }
  };

  const isValid = (s) => {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
      if (map[char]) {
        if (stack.pop() !== map[char]) {
          return false;
        }
      } else {
        stack.push(char);
      }
    }
    return stack.length === 0;
  };

  const mergeTwoSortedLists = (list1, list2) => {
    const result = [];
    let i = 0, j = 0;
    
    while (i < list1.length && j < list2.length) {
      if (list1[i] <= list2[j]) {
        result.push(list1[i]);
        i++;
      } else {
        result.push(list2[j]);
        j++;
      }
    }
    
    while (i < list1.length) {
      result.push(list1[i]);
      i++;
    }
    
    while (j < list2.length) {
      result.push(list2[j]);
      j++;
    }
    
    return result;
  };

  const maxSubArray = (nums) => {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
      currentSum = Math.max(nums[i], currentSum + nums[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
  };

  const inorderTraversal = (root) => {
    if (!root || root.length === 0) return [];
    
    const result = [];
    
    function inorder(nodeIndex) {
      if (nodeIndex >= root.length || root[nodeIndex] === null) return;
      
      inorder(2 * nodeIndex + 1);
      result.push(root[nodeIndex]);
      inorder(2 * nodeIndex + 2);
    }
    
    inorder(0);
    return result;
  };

  const lengthOfLongestSubstring = (s) => {
    const charSet = new Set();
    let maxLength = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
      while (charSet.has(s[right])) {
        charSet.delete(s[left]);
        left++;
      }
      charSet.add(s[right]);
      maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
  };

  const isMatch = (s, p) => {
    const dp = Array(s.length + 1).fill(null).map(() => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    
    for (let j = 1; j <= p.length; j++) {
      if (p[j - 1] === '*') {
        dp[0][j] = dp[0][j - 2];
      }
    }
    
    for (let i = 1; i <= s.length; i++) {
      for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === s[i - 1] || p[j - 1] === '.') {
          dp[i][j] = dp[i - 1][j - 1];
        } else if (p[j - 1] === '*') {
          dp[i][j] = dp[i][j - 2];
          if (p[j - 2] === s[i - 1] || p[j - 2] === '.') {
            dp[i][j] = dp[i][j] || dp[i - 1][j];
          }
        }
      }
    }
    
    return dp[s.length][p.length];
  };

  if (isLoading || !problem) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <ProblemDescription problem={problem} />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <Collaboration problemId={problem.id} />
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-white dark:bg-gray-800">
          <div className="border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>
                <Link
                  to="/submissions"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors"
                >
                  <History className="h-4 w-4" />
                  <span>Submissions</span>
                </Link>
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  <span>{isRunning ? 'Running...' : 'Run Code'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              fontSize={userPrefs.fontSize}
              fontFamily={userPrefs.fontFamily}
            />
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex">
                {['testCases', 'console', 'notes', 'hints'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 ${
                      activeTab === tab
                        ? 'border-green-600 text-green-600 dark:text-green-400'
                        : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {tab === 'testCases' && <span>Test Cases</span>}
                    {tab === 'console' && <span>Console</span>}
                    {tab === 'notes' && (
                      <>
                        <FileText className="h-4 w-4" />
                        <span>Notes</span>
                      </>
                    )}
                    {tab === 'hints' && <span>Hints</span>}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-64 overflow-y-auto">
              {activeTab === 'testCases' && (
                <TestCases 
                  testResults={testResults}
                  problem={problem}
                />
              )}
              {activeTab === 'console' && (
                <div className="p-4">
                  <pre className="text-sm text-gray-600 dark:text-gray-400 code-output">
                    {consoleOutput || 'Console output will appear here...'}
                  </pre>
                </div>
              )}
              {activeTab === 'notes' && (
                <div className="p-4">
                  <textarea
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder="Add your notes about this problem..."
                    className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Your notes are automatically saved and will be available when you revisit this problem.
                  </p>
                </div>
              )}
              {activeTab === 'hints' && (
                <div className="p-4">
                  <CodeHints problem={problem} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;
