import type { Airport } from '../types/airport';
import airportsData from '../static/airports.json';

interface AirportsData {
  airports: Airport[];
}

const getAirports = (): Airport[] => {
  try {
    const data = airportsData as AirportsData;
    return data.airports || [];
  } catch (error) {
    console.error('Error loading airports:', error);
    return [];
  }
};

export const searchAirports = (query: string): Airport[] => {
  if (!query?.trim()) return [];
  
  try {
    const searchTerm = query.toLowerCase().trim();
    const airports = getAirports();
    
    return airports
      .filter(airport => 
        airport.airport_code.toLowerCase().includes(searchTerm) ||
        airport.airport_name.toLowerCase().includes(searchTerm) ||
        airport.town.toLowerCase().includes(searchTerm) ||
        airport.country.toLowerCase().includes(searchTerm)
      )
      .slice(0, 10); // Limit to 10 results for performance
  } catch (error) {
    console.error('Error searching airports:', error);
    return [];
  }
};