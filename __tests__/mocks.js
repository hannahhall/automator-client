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

export const mockDataRejection = (func, data) => {
  func.mockRejectedValue({
    response: { data },
  });
};
