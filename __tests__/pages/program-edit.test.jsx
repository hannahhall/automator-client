import '@testing-library/jest-dom';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import EditProgram from '../../pages/programs/[id]/edit';
import { AuthProvider } from '../../hooks/useAuth';
import {
  mockDataSuccess,
  mockFetchToken,
} from '../mocks';
import { updateProgram, fetchProgram } from '../../data/program';
import { fetchTechs } from '../../data/tech';

jest.mock('../../data/tech', () => ({
  fetchTechs: jest.fn(),
}));
jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));
jest.mock('../../data/program', () => ({
  updateProgram: jest.fn(),
  fetchProgram: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/programs/1/edit', query: { id: 1 } });

let program;
let accessToken;
let techs;
describe('Edit Program', () => {
  beforeEach(() => {
    techs = [{ id: 1, text: 'Python', square_icon: 'http://google.com' }];
    program = {
      id: 1,
      name: 'Web Dev',
      techs,
    };
    accessToken = 'test1234';
    jest.clearAllMocks();

    mockDataSuccess(fetchProgram, program);
    mockDataSuccess(fetchTechs, techs);
    mockFetchToken(accessToken);
  });

  afterEach(cleanup);

  it('renders a heading', async () => {
    render(
      <AuthProvider>
        <EditProgram />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: `Edit ${program.name}`,
    });

    expect(heading).toBeInTheDocument();
  });

  it('should call the updateProgram function when submitted', async () => {
    const user = userEvent.setup();

    mockDataSuccess(updateProgram, program);

    render(
      <AuthProvider>
        <EditProgram />
      </AuthProvider>,
    );

    const programNameInput = await screen.findByLabelText('Program Name');
    await user.type(programNameInput, ' Updated');

    const form = await screen.findByRole('form');
    form.submit();
    await waitFor(async () => {
      expect(updateProgram).toBeCalledWith({ id: program.id, name: 'Web Dev Updated', techs: [1] }, accessToken);
      expect(pushMock).toBeCalledWith(`/programs/${program.id}`);
    });
  });

  it('should route back to the detail page on cancel', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <EditProgram />
      </AuthProvider>,
    );

    await user.click(await screen.findByText('Cancel'));
    expect(pushMock).toBeCalledWith(`/programs/${program.id}`);
  });
});
