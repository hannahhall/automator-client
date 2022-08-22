const API_BASE = 'http://localhost:8000';

export const makeUrl = (endpoint: string): string => {
  return API_BASE + endpoint;
};

