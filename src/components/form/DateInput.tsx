import React from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}

export default function DateInput({ value, onChange, label, required = true }: DateInputProps) {
  // Format today's date as YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => {
            console.log("DateInput onChange triggered:", e.target.value);
            onChange(e.target.value)}
          }
          min={today}
          required={required}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}