import React from 'react';
import { useSignalEffect } from '@preact/signals-react';
import { signal } from '@preact/signals-react';
import type { Signal } from '@preact/signals-react';

import { Plane } from 'lucide-react';
import { useFlightForm } from '../hooks/useFlightForm';
import FlightTypeSelect from './form/FlightTypeSelect';
import FlightClassSelect from './form/FlightClassSelect';
import TravelersInput from './form/TravelersInput';
import AirportSelect from './form/AirportSelect';
import DateInput from './form/DateInput';
import EmissionsResult from './EmissionsResult';
import FormResult from './FormResult';

export default function FlightSearchForm() {
  const {
    formDataSignal,
    loading,
    error,
    emissionsData,
    updateField,
    handleSubmit
  } = useFlightForm();

  console.log("Rendering with departureDate:", formDataSignal.value.departureDate);
  
  useSignalEffect(() => {
    console.log("Signal change detected:", formDataSignal.value.departureDate);
  });


  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <FlightTypeSelect
              value={formDataSignal.value.flightType}
              onChange={(value) => updateField('flightType', value)}
            />
            <AirportSelect
              value={formDataSignal.value.from}
              onChange={(value) => updateField('from', value)}
              placeholder="Search Airport"
              label="From"
            />
            <AirportSelect
              value={formDataSignal.value.via}
              onChange={(value) => updateField('via', value)}
              placeholder="Search Airport (Optional)"
              label="Via"
            />
            <AirportSelect
              value={formDataSignal.value.destination}
              onChange={(value) => updateField('destination', value)}
              placeholder="Search Airport"
              label="Destination"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FlightClassSelect
              value={formDataSignal.value.flightClass}
              onChange={(value) => updateField('flightClass', value)}
            />
            <DateInput
              value={formDataSignal.value.departureDate}
              onChange={(value) => updateField('departureDate', value)}
              label="Departure Date"
            />
            <TravelersInput
              value={formDataSignal.value.travelers}
              onChange={(value) => updateField('travelers', value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="radiativeFactor"
              checked={formDataSignal.value.radiativeFactor}
              onChange={(e) => updateField('radiativeFactor', e.target.checked)}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="radiativeFactor" className="text-sm text-gray-700">
              Add Radiative Factor
            </label>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-2.5 bg-blue-500 text-white font-medium text-sm rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <Plane className="w-5 h-5 mr-2" />
                  Calculate Emissions
                </>
              )}
            </button>
          </div>
        </form>

        {emissionsData && (
          <EmissionsResult
            data={emissionsData}
            loading={loading}
            formData={formDataSignal.value}
          />
        )}
      </div>
      <FormResult data={formDataSignal} />
    </>
  );
}