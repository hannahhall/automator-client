const API_BASE = 'http://localhost:8000';

const makeUrl = (endpoint: string): string => API_BASE + endpoint;
export default makeUrl;
