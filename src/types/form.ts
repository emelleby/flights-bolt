export interface FormInputData {
  flightType: string;
  from: string;
  via: string;
  destination: string;
  flightClass: string;
  travelers: number;
  radiativeFactor: boolean;
  departureDate: string;
}

export const FLIGHT_TYPES = ['Return', 'One way'] as const;
export const FLIGHT_CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'] as const;