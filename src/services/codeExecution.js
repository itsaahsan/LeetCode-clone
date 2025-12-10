export const executeCode = async (code, language, input, problemId) => {
  return new Promise((resolve, reject) => {
    try {
      let result;
      let consoleOutput = '';
      
      const originalLog = console.log;
      console.log = (...args) => {
        consoleOutput += args.join(' ') + '\n';
      };

      const timeout = setTimeout(() => {
        console.log = originalLog;
        reject(new Error('Code execution timeout (5 seconds)'));
      }, 5000);

      try {
        switch (language) {
          case 'javascript':
            result = executeJavaScript(code, input, problemId);
            break;
          case 'python':
            result = simulatePythonExecution(code, input, problemId);
            break;
          case 'java':
            result = simulateJavaExecution(code, input, problemId);
            break;
          default:
            throw new Error(`Unsupported language: ${language}`);
        }

        clearTimeout(timeout);
        console.log = originalLog;
        
        resolve({
          result,
          consoleOutput,
          executionTime: Math.random() * 100 + 10,
          memoryUsage: Math.random() * 20 + 5
        });
      } catch (error) {
        clearTimeout(timeout);
        console.log = originalLog;
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const executeJavaScript = (code, input, problemId) => {
  try {
    const functionName = getFunctionName(problemId);
    const inputKeys = Object.keys(input);
    const inputValues = Object.values(input);
    
    const userFunction = new Function(...inputKeys, `
      ${code}
      return ${functionName}(${inputKeys.join(', ')});
    `);
    
    return userFunction(...inputValues);
  } catch (error) {
    throw new Error(`JavaScript execution error: ${error.message}`);
  }
};

const simulatePythonExecution = (code, input, problemId) => {
  try {
    const functionName = getFunctionName(problemId);
    const inputKeys = Object.keys(input);
    const inputValues = Object.values(input);
    
    const jsCode = code
      .replace(/def\s+(\w+)/g, 'function $1')
      .replace(/:/g, '')
      .replace(/pass/g, '// pass')
      .replace(/print\(/g, 'console.log(')
      .replace(/None/g, 'null')
      .replace(/True/g, 'true')
      .replace(/False/g, 'false');
    
    const userFunction = new Function(...inputKeys, `
      ${jsCode}
      return ${functionName}(${inputKeys.join(', ')});
    `);
    
    return userFunction(...inputValues);
  } catch (error) {
    throw new Error(`Python execution error: ${error.message}`);
  }
};

const simulateJavaExecution = (code, input, problemId) => {
  try {
    const functionName = getFunctionName(problemId);
    const inputKeys = Object.keys(input);
    const inputValues = Object.values(input);
    
    const methodMatch = code.match(/public\s+\w+\s+(\w+)\s*\([^)]*\)\s*\{([\s\S]*?)\}/);
    if (!methodMatch) {
      throw new Error('Could not find Java method');
    }
    
    const methodBody = methodMatch[2];
    const jsMethodBody = methodBody
      .replace(/System\.out\.println\(/g, 'console.log(')
      .replace(/return\s+(\w+);/g, 'return $1;')
      .replace(/int\s+/g, 'let ')
      .replace(/String\s+/g, 'let ');
    
    const userFunction = new Function(...inputKeys, `
      ${jsMethodBody}
      return ${functionName}(${inputKeys.join(', ')});
    `);
    
    return userFunction(...inputValues);
  } catch (error) {
    throw new Error(`Java execution error: ${error.message}`);
  }
};

const getFunctionName = (problemId) => {
  const functionNames = {
    1: 'twoSum',
    2: 'reverseString',
    3: 'isValid',
    4: 'mergeTwoLists',
    5: 'maxSubArray',
    6: 'inorderTraversal',
    7: 'lengthOfLongestSubstring',
    8: 'isMatch'
  };
  return functionNames[problemId] || 'solution';
};

export const getSolutionForProblem = (problemId, language = 'javascript') => {
  const solutions = {
    1: {
      javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
      python: `def twoSum(nums, target):
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    return []`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`
    },
    2: {
      javascript: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
    return s;
}`,
      python: `def reverseString(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s`,
      java: `public void reverseString(char[] s) {
    int left = 0;
    int right = s.length - 1;
    while (left < right) {
        char temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
}`
    }
  };
  
  return solutions[problemId]?.[language] || '';
};

export const validateCode = (code, language) => {
  if (!code || code.trim().length === 0) return false;
  
  const hasFunction = {
    javascript: /function\s+\w+\s*\(/.test(code),
    python: /def\s+\w+\s*\(/.test(code),
    java: /public\s+\w+\s+\w+\s*\(/.test(code)
  };
  
  return hasFunction[language] !== false;
};
