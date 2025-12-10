import React from 'react';
import { Users, MessageSquare } from 'lucide-react';

const Collaboration = ({ problemId }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Collaboration</h3>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-3">
        <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Discuss this problem with others</span>
        </p>
      </div>
    </div>
  );
};

export default Collaboration;
