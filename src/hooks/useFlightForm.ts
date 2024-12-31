import { useCallback } from 'react';
import { formData, loading, error, emissionsData } from '../signals/flightForm';
import type { FormInputData } from '../types/form';
import { calculateEmissions } from '../services/api';
import type { EmissionsRequest } from '../types/api';

const transformFormData = (data: FormInputData): EmissionsRequest => ({
  route: [data.from, data.via, data.destination].filter(Boolean),
  class: data.flightClass.toLowerCase().replace(' ', '_'),
  return: data.flightType === 'Return',
  ir_factor: data.radiativeFactor,
  departureDate: data.departureDate,
  travelers: data.travelers
});

export const useFlightForm = () => {
  const updateField = useCallback(<K extends keyof FormInputData>(
    field: K,
    value: FormInputData[K]
  ) => {
    console.log(`Updating field ${field} to ${value}`);
    formData.value = {
      ...formData.value,
      [field]: value
    };
    console.log("Updated formData:", formData.value);
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.value.from || !formData.value.destination || !formData.value.departureDate) {
      error.value = 'Please fill in all required fields';
      return;
    }

    loading.value = true;
    error.value = null;
    
    try {
      const transformedData = transformFormData(formData.value);
      const result = await calculateEmissions(transformedData);
      emissionsData.value = result;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred';
      emissionsData.value = null;
    } finally {
      loading.value = false;
    }
  }, []);

  return {
    formDataSignal: formData,
    loading: loading.value,
    error: error.value,
    emissionsData: emissionsData.value,
    updateField,
    handleSubmit
  };
};