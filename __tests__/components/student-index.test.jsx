import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Router from 'next/router';
import StudentIndex from '../../components/student-index';
import { AuthProvider } from '../../hooks/useAuth';
import { fetchStudent } from '../../data/auth';
import { mockDataSuccess, mockFetchToken } from '../mocks';

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
  fetchStudent: jest.fn(),
}));
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: jest.fn(), pathname: '/' });

let student;
let token;

describe('StudentIndex', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    student = {
      id: 1,
      first_name: {
        verbose_name: 'First Name',
        value: 'Test',
      },
      last_name: {
        verbose_name: 'Last Name',
        value: 'McTesty',
      },
      circle_image: {
        verbose_name: 'Profile Image',
        value: 'http://test.com',
      },
    };
    token = '12345';
    mockFetchToken(token);
    mockDataSuccess(fetchStudent, student);
  });

  it('should render and fetch student', async () => {
    render(
      <AuthProvider>
        <StudentIndex />
      </AuthProvider>,
    );

    await waitFor(() => {
      const studentIndexTitle = screen.getByText(`${student.first_name.value} ${student.last_name.value}`);
      expect(studentIndexTitle).toBeInTheDocument();
      expect(fetchStudent).toBeCalledWith(token);
    });
  });
});
