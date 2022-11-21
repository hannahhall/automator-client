import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import ProjectList from '../../components/projects/project-list';
import { AuthProvider } from '../../hooks/useAuth';
import { deleteProject, fetchProjects } from '../../data/project';
import { mockDataSuccess, mockFetchToken } from '../mocks';

jest.mock('../../data/project', () => ({
  fetchProjects: jest.fn(),
  deleteProject: jest.fn(),
}));
jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: jest.fn(), pathname: '/' });

let projects;
let token;

describe('ProjectList', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    projects = [{
      id: 1,
      title: 'Front end Capstone',
    },
    {
      id: 2,
      title: 'Server side Capstone',
    }];
    token = '12345';
    mockFetchToken(token);
    mockDataSuccess(fetchProjects, projects);
  });

  it('should render and fetch projects', async () => {
    render(
      <AuthProvider>
        <ProjectList />
      </AuthProvider>,
    );

    const projectListTitle = screen.getByText('Projects');
    expect(projectListTitle).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchProjects).toBeCalledWith(token);
    });
  });

  it('should delete the project', async () => {
    mockDataSuccess(deleteProject, {});

    const user = userEvent.setup();
    const project = projects[0];
    render(
      <AuthProvider>
        <ProjectList />
      </AuthProvider>,
    );

    await user.click(await screen.findByTestId(`delete-project-${project.id}`));

    expect(deleteProject).toBeCalledWith(project.id, token);
    expect(fetchProjects).toBeCalledTimes(2);
  });
});
