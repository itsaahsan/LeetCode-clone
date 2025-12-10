import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save } from 'lucide-react';
import { getUserPreferences, saveUserPreferences } from '../utils/storage';

const Settings = () => {
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('Monaco, Menlo, Ubuntu Mono, monospace');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = getUserPreferences();
    setFontSize(prefs.fontSize || 14);
    setFontFamily(prefs.fontFamily || 'Monaco, Menlo, Ubuntu Mono, monospace');
  }, []);

  const handleSave = () => {
    saveUserPreferences({ fontSize, fontFamily });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <SettingsIcon className="h-8 w-8 text-green-600" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 max-w-2xl">
        <div className="space-y-6">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Editor Font Size
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="10"
                max="20"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white w-12">{fontSize}px</span>
            </div>
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Font Family
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
            >
              <option value="Monaco, Menlo, Ubuntu Mono, monospace">Monaco</option>
              <option value="Courier New, monospace">Courier New</option>
              <option value="Consolas, monospace">Consolas</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="btn-primary flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Settings</span>
            </button>
            {saved && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">Settings saved successfully!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
