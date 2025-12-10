# LeetCode Clone

A professional LeetCode-style coding practice platform built with React, Vite, and Tailwind CSS.

## Features

✅ **Code Editor** - Write and execute code in JavaScript, Python, and Java

✅ **Test Cases** - Run test cases and see results with performance metrics
✅ **Problem Solving** - 8 curated problems with hints and solutions
✅ **Submission History** - Track all your code submissions
✅ **User Authentication** - Login and register system
✅ **Dark/Light Theme** - Toggle between themes
✅ **Problem Favorites** - Mark problems as favorites
✅ **User Statistics** - Track solved problems, acceptance rate, and streaks
✅ **Problem Notes** - Add personal notes to problems
✅ **Responsive Design** - Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Editor**: Monaco Editor
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: React Hooks
- **Storage**: LocalStorage

## Installation

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/          # React components
│   ├── Auth/           # Login & Register pages
│   ├── ProblemSolver.jsx
│   ├── ProblemList.jsx
│   ├── Dashboard.jsx
│   ├── Submissions.jsx
│   └── ...
├── contexts/           # Auth context
├── data/              # Problem data
├── services/          # Code execution service
├── utils/             # Storage utilities
├── App.jsx
├── index.css
└── main.jsx
```

## Problems Included

1. Two Sum (Easy)
2. Reverse String (Easy)
3. Valid Parentheses (Easy)
4. Merge Two Sorted Lists (Easy)
5. Maximum Subarray (Medium)
6. Binary Tree Inorder Traversal (Medium)
7. Longest Substring Without Repeating Characters (Medium)
8. Regular Expression Matching (Hard)

## Features Details

### Code Execution
- JavaScript: Direct execution
- Python & Java: Simulated through JavaScript conversion

### Test Cases
- Run multiple test cases
- View execution time and memory usage
- See console output

### User Progress
- Track solved problems
- Calculate acceptance rate
- Maintain daily streaks
- Store problem notes

### Authentication
- Demo login (any email/password)
- User profile with statistics
- Session persistence

## Usage

1. **Sign In** - Use any email and password
2. **Browse Problems** - View all problems with filters
3. **Solve Problem** - Write code in the editor
4. **Run Tests** - Execute code against test cases
5. **Submit** - Track your submissions
6. **View Stats** - Check your progress on dashboard

## Customization

### Add New Problems
Edit `src/data/problems.js` and add problem objects with:
- id, title, difficulty, acceptance
- description, examples, constraints
- testCases, hints, solutions

### Change Theme Colors
Update Tailwind config in `tailwind.config.js`

### Modify Editor Settings
Edit `src/components/Settings.jsx`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

LeetCode Clone Project
