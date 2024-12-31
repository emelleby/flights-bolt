import { signal } from '@preact/signals-react';
import type { EmissionsResponse } from '../services/api';
import type { FormInputData } from '../types/form';

const INITIAL_FORM_DATA: FormInputData = {
  flightType: 'Return',
  from: '',
  via: '',
  destination: '',
  flightClass: 'Economy',
  travelers: 1,
  radiativeFactor: false,
  departureDate: new Date().toISOString().split('T')[0], // Set today as default date
};

export const formData = signal<FormInputData>(INITIAL_FORM_DATA);
export const loading = signal(false);
export const error = signal<string | null>(null);
export const emissionsData = signal<EmissionsResponse | null>(null);