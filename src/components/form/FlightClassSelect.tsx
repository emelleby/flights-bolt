import React from 'react';
import SelectInput from '../common/SelectInput';
import { FLIGHT_CLASSES } from '../../types/form';

interface FlightClassSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FlightClassSelect({ value, onChange }: FlightClassSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Flight Class
      </label>
      <SelectInput
        value={value}
        onChange={onChange}
        options={FLIGHT_CLASSES}
        placeholder="Select Class"
      />
    </div>
  );
}