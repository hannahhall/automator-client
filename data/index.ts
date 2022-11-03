const API_BASE = process.env.REACT_APP_API;

const makeUrl = (endpoint: string): string => API_BASE + endpoint;
export default makeUrl;
