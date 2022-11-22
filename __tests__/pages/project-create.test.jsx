import '@testing-library/jest-dom';
import {
  cleanup, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import CreateProject from '../../pages/projects/create';
import { AuthProvider } from '../../hooks/useAuth';
import { createProject } from '../../data/project';
import {
  mockDataSuccess,
  mockFetchToken,
} from '../mocks';

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));
jest.mock('../../data/project', () => ({
  createProject: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/projects/create' });

let accessToken;
describe('Create Project', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockFetchToken(accessToken);
  });

  afterEach(cleanup);

  it('renders', async () => {
    render(
      <AuthProvider>
        <CreateProject />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: 'Create a Project',
    });

    expect(heading).toBeInTheDocument();
  });

  it('submits the new project', async () => {
    const project = {
      title: 'New Project',
      github_url: 'http://github.com',
      deployed_url: 'http://test.com',
      description: 'This project is build with react',
    };

    mockDataSuccess(createProject, { id: 1, ...project });

    const user = userEvent.setup();

    render(
      <AuthProvider>
        <CreateProject />
      </AuthProvider>,
    );

    await user.type(screen.getByLabelText('Project Title'), project.title);
    await user.type(screen.getByLabelText('Github Url'), project.github_url);
    await user.type(screen.getByLabelText('Deployed Url'), project.deployed_url);
    await user.type(screen.getByLabelText('Project Description'), project.description);

    await user.click(screen.getByText('Submit'));

    expect(createProject).toBeCalledWith(project, accessToken);
    expect(pushMock).toBeCalledWith('/');
  });
});
