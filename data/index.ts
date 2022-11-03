const API_BASE = process.env.NEXT_PUBLIC_API;

const makeUrl = (endpoint: string): string => API_BASE + endpoint;
export default makeUrl;
