import { fetchNewToken } from '../data/auth';

export const mockFetchToken = (token) => {
  fetchNewToken.mockResolvedValue({
    data: {
      access: token,
    },
  });
};

export const mockDataSuccess = (func, data) => {
  func.mockResolvedValue({
    data,
  });
};

export const mockDataRejection = (func, data, status = 400) => {
  func.mockRejectedValue({
    response: { data, status },
  });
};
