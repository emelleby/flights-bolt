import React from 'react';
import SelectInput from '../common/SelectInput';
import { FLIGHT_TYPES } from '../../types/form';

interface FlightTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function FlightTypeSelect({ value, onChange }: FlightTypeSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Flight Type
      </label>
      <SelectInput
        value={value}
        onChange={onChange}
        options={FLIGHT_TYPES}
        placeholder="Select Type"
      />
    </div>
  );
}