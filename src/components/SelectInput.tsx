import React, { useState } from 'react';

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export default function SelectInput({ value, onChange, options, placeholder }: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only update parent if the value matches an option
    if (options.includes(newValue)) {
      onChange(newValue);
    }
  };

  const handleOptionSelect = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  // Filter options based on input value
  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none cursor-pointer"
      />
      <div
        className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={`px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm ${
                  option === value ? 'bg-blue-50' : ''
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}