import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import Router from 'next/router';
import EditProject from '../../pages/projects/[id]/edit';
import { AuthProvider } from '../../hooks/useAuth';
import { updateProject, fetchProject } from '../../data/project';
import {
  mockDataSuccess,
  mockFetchToken,
} from '../mocks';

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));
jest.mock('../../data/project', () => ({
  updateProject: jest.fn(),
  fetchProject: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/projects/1/edit', query: { id: 1 } });

let accessToken;
let project;
describe('Edit Project', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    project = {
      title: 'My Cool Project',
      github_url: 'http://github.com',
      deployed_url: 'http://test.com',
      description: 'Project Description',
    };

    accessToken = '12345';

    mockFetchToken(accessToken);
    mockDataSuccess(fetchProject, project);
  });

  afterEach(cleanup);

  it('renders', async () => {
    render(
      <AuthProvider>
        <EditProject />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: `Edit ${project.title}`,
    });

    expect(heading).toBeInTheDocument();
  });

  it('submits the form', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <EditProject />
      </AuthProvider>,
    );

    mockDataSuccess(updateProject, {});
    const titleInput = await screen.findByLabelText('Project Title');
    await user.type(titleInput, ' Updated');
    const form = await screen.findByRole('form');
    await form.submit();
    await waitFor(async () => {
      expect(updateProject).toBeCalledWith({ ...project, title: `${project.title} Updated` }, accessToken);
    });
  });
});
