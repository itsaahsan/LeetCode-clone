export const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    acceptance: 47.3,
    tags: ["Array", "Hash Table"],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    testCases: [
      {
        input: { nums: [2,7,11,15], target: 9 },
        expected: [0, 1]
      },
      {
        input: { nums: [3,2,4], target: 6 },
        expected: [1, 2]
      },
      {
        input: { nums: [3,3], target: 6 },
        expected: [0, 1]
      }
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just to get an understanding of the problem.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our scan to make this faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe to memorize each number already seen?"
    ],
    solutions: {
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
    }
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    acceptance: 72.1,
    tags: ["String", "Two Pointers"],
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      {
        input: 's = ["h","e","l","l","o"]',
        output: '["o","l","l","e","h"]',
        explanation: ""
      },
      {
        input: 's = ["H","a","n","n","a","h"]',
        output: '["h","a","n","n","a","H"]',
        explanation: ""
      }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    testCases: [
      {
        input: { s: ["h","e","l","l","o"] },
        expected: ["o","l","l","e","h"]
      },
      {
        input: { s: ["H","a","n","n","a","h"] },
        expected: ["h","a","n","n","a","H"]
      },
      {
        input: { s: ["a","b"] },
        expected: ["b","a"]
      }
    ],
    hints: [
      "The entire thing can be done in-place, without allocating any extra memory.",
      "Think about how you would do this if you had to swap two numbers. Can you apply the same logic here?",
      "Use two pointers, one starting from the beginning and one from the end, and swap the characters as you move towards the center."
    ],
    solutions: {
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
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    acceptance: 40.2,
    tags: ["String", "Stack"],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation: ""
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation: ""
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation: ""
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    testCases: [
      {
        input: { s: "()" },
        expected: true
      },
      {
        input: { s: "()[]{}" },
        expected: true
      },
      {
        input: { s: "(]" },
        expected: false
      },
      {
        input: { s: "([)]" },
        expected: false
      },
      {
        input: { s: "{[]}" },
        expected: true
      }
    ],
    hints: [
      "An interesting property about a valid parenthesis expression is that a sub-expression of a valid expression should also be a valid expression.",
      "What if whenever we encounter a matching pair of parenthesis in the expression, we simply remove it from the expression? This would keep on shortening the expression.",
      "The stack data structure can come in handy here in representing this recursive structure of the problem."
    ],
    solutions: {
      javascript: `function isValid(s) {
    const stack = [];
    const map = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
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
}`,
      python: `def isValid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    Map<Character, Character> map = Map.of(')', '(', '}', '{', ']', '[');
    
    for (char c : s.toCharArray()) {
        if (map.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != map.get(c)) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    
    return stack.isEmpty();
}`
    }
  },
  {
    id: 4,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    acceptance: 61.8,
    tags: ["Linked List", "Recursion"],
    description: `You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]",
        explanation: ""
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]",
        explanation: ""
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]",
        explanation: ""
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    testCases: [
      {
        input: { list1: [1,2,4], list2: [1,3,4] },
        expected: [1,1,2,3,4,4]
      },
      {
        input: { list1: [], list2: [] },
        expected: []
      },
      {
        input: { list1: [], list2: [0] },
        expected: [0]
      }
    ],
    hints: [
      "We can accomplish this without any extra space. Think about how you would do this in real life.",
      "You just need to decide which should be the next node in the new list by comparing the current nodes in both lists.",
      "Use recursion to solve this problem. At each step, compare the current nodes and recursively merge the remaining lists."
    ],
    solutions: {
      javascript: `function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}`,
      python: `def mergeTwoLists(list1, list2):
    dummy = ListNode(0)
    current = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next
    
    current.next = list1 or list2
    return dummy.next`,
      java: `public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    
    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = (list1 != null) ? list1 : list2;
    return dummy.next;
}`
    }
  },
  {
    id: 5,
    title: "Maximum Subarray",
    difficulty: "Medium",
    acceptance: 46.3,
    tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
    description: `Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.`,
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1",
        explanation: ""
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23",
        explanation: ""
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    testCases: [
      {
        input: { nums: [-2,1,-3,4,-1,2,1,-5,4] },
        expected: 6
      },
      {
        input: { nums: [1] },
        expected: 1
      },
      {
        input: { nums: [5,4,-1,7,8] },
        expected: 23
      }
    ],
    hints: [
      "Think about how you would solve this problem if you were doing it manually.",
      "Use Kadane's algorithm. Keep track of the maximum sum ending at each position.",
      "If the current sum becomes negative, reset it to zero and start a new subarray."
    ],
    solutions: {
      javascript: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
      python: `def maxSubArray(nums):
    max_sum = current_sum = nums[0]
    
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
      java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`
    }
  },
  {
    id: 6,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Medium",
    acceptance: 73.2,
    tags: ["Stack", "Tree", "Depth-First Search"],
    description: `Given the root of a binary tree, return the inorder traversal of its nodes' values.`,
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]",
        explanation: ""
      },
      {
        input: "root = []",
        output: "[]",
        explanation: ""
      },
      {
        input: "root = [1]",
        output: "[1]",
        explanation: ""
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    testCases: [
      {
        input: { root: [1,null,2,3] },
        expected: [1,3,2]
      },
      {
        input: { root: [] },
        expected: []
      },
      {
        input: { root: [1] },
        expected: [1]
      }
    ],
    hints: [
      "Inorder traversal means visiting the left subtree, then the root, then the right subtree.",
      "Use recursion to implement this. The base case is when the node is null.",
      "For iterative solution, use a stack to simulate the recursion."
    ],
    solutions: {
      javascript: `function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}`,
      python: `def inorderTraversal(root):
    result = []
    
    def inorder(node):
        if node:
            inorder(node.left)
            result.append(node.val)
            inorder(node.right)
    
    inorder(root)
    return result`,
      java: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    inorderHelper(root, result);
    return result;
}

private void inorderHelper(TreeNode node, List<Integer> result) {
    if (node != null) {
        inorderHelper(node.left, result);
        result.add(node.val);
        inorderHelper(node.right, result);
    }
}`
    }
  },
  {
    id: 7,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    acceptance: 33.4,
    tags: ["Hash Table", "String", "Sliding Window"],
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3."
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: "The answer is \"b\", with the length of 1."
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: "The answer is \"wke\", with the length of 3. Notice that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    testCases: [
      {
        input: { s: "abcabcbb" },
        expected: 3
      },
      {
        input: { s: "bbbbb" },
        expected: 1
      },
      {
        input: { s: "pwwkew" },
        expected: 3
      }
    ],
    hints: [
      "Use a sliding window approach with two pointers.",
      "Keep track of characters you've seen using a hash set or hash map.",
      "When you encounter a repeating character, move the left pointer to skip the previous occurrence."
    ],
    solutions: {
      javascript: `function lengthOfLongestSubstring(s) {
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
}`,
      python: `def lengthOfLongestSubstring(s):
    char_set = set()
    max_length = 0
    left = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
      java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> charSet = new HashSet<>();
    int maxLength = 0;
    int left = 0;
    
    for (int right = 0; right < s.length(); right++) {
        while (charSet.contains(s.charAt(right))) {
            charSet.remove(s.charAt(left));
            left++;
        }
        charSet.add(s.charAt(right));
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`
    }
  },
  {
    id: 8,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    acceptance: 26.7,
    tags: ["String", "Dynamic Programming", "Recursion"],
    description: `Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).`,
    examples: [
      {
        input: 's = "aa", p = "a"',
        output: "false",
        explanation: "\"a\" does not match the entire string \"aa\"."
      },
      {
        input: 's = "aa", p = "a*"',
        output: "true",
        explanation: "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\"."
      },
      {
        input: 's = "ab", p = ".*"',
        output: "true",
        explanation: '".*" means \"zero or more (*) of any character (.)\".'
      }
    ],
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 30",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
    ],
    testCases: [
      {
        input: { s: "aa", p: "a" },
        expected: false
      },
      {
        input: { s: "aa", p: "a*" },
        expected: true
      },
      {
        input: { s: "ab", p: ".*" },
        expected: true
      }
    ],
    hints: [
      "Use dynamic programming to solve this problem.",
      "Create a 2D table where dp[i][j] represents whether s[0:i] matches p[0:j]",
      "Handle the '*' case carefully - it can match zero or more of the preceding character."
    ],
    solutions: {
      javascript: `function isMatch(s, p) {
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
}`,
      python: `def isMatch(s, p):
    dp = [[False] * (len(p) + 1) for _ in range(len(s) + 1)]
    dp[0][0] = True
    
    for j in range(1, len(p) + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]
    
    for i in range(1, len(s) + 1):
        for j in range(1, len(p) + 1):
            if p[j - 1] == s[i - 1] or p[j - 1] == '.':
                dp[i][j] = dp[i - 1][j - 1]
            elif p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2]
                if p[j - 2] == s[i - 1] or p[j - 2] == '.':
                    dp[i][j] = dp[i][j] or dp[i - 1][j]
    
    return dp[len(s)][len(p)]`,
      java: `public boolean isMatch(String s, String p) {
    boolean[][] dp = new boolean[s.length() + 1][p.length() + 1];
    dp[0][0] = true;
    
    for (int j = 1; j <= p.length(); j++) {
        if (p.charAt(j - 1) == '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 1; j <= p.length(); j++) {
            if (p.charAt(j - 1) == s.charAt(i - 1) || p.charAt(j - 1) == '.') {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p.charAt(j - 1) == '*') {
                dp[i][j] = dp[i][j - 2];
                if (p.charAt(j - 2) == s.charAt(i - 1) || p.charAt(j - 2) == '.') {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }
    
    return dp[s.length()][p.length()];
}`
    }
  }
];

export const getProblemById = (id) => {
  return problems.find(problem => problem.id === parseInt(id));
};

export const getAllProblems = () => {
  return problems;
};