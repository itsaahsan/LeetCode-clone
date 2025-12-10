import React from 'react';
import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'Array', count: 2 },
    { name: 'String', count: 2 },
    { name: 'Hash Table', count: 1 },
    { name: 'Stack', count: 2 },
    { name: 'Tree', count: 1 },
    { name: 'Dynamic Programming', count: 2 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <Link key={i} to="/problems" className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <Hash className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{cat.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{cat.count} problems</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
