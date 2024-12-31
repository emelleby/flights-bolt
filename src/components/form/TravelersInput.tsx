import React from 'react';
import { Users } from 'lucide-react';

interface TravelersInputProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TravelersInput({ value, onChange }: TravelersInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Travelers
      </label>
      <div className="relative">
        <input
          type="number"
          required
          min="1"
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value) || 1;
            onChange(newValue);
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
}