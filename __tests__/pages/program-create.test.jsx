import '@testing-library/jest-dom';
import {
  cleanup, render, screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import CreateProgram from '../../pages/programs/create';
import { AuthProvider } from '../../hooks/useAuth';
import { createProgram } from '../../data/program';

const accessToken = 'test1234';
jest.mock('../../data/tech', () => ({
  fetchTechs: jest.fn().mockResolvedValue({
    data: [{ id: 1, text: 'Python', square_icon: 'http://google.com' }],
  }),
}));
jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn().mockResolvedValue({
    data: {
      access: 'test1234',
    },
  }),
  fetchUser: jest.fn().mockResolvedValue({}),
}));
jest.mock('../../data/program', () => ({
  createProgram: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/programs/create' });

describe('Create Program', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('renders a heading', async () => {
    render(
      <AuthProvider>
        <CreateProgram />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: 'Create a Program',
    });

    expect(heading).toBeInTheDocument();
  });

  it('should update the form state for name', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <CreateProgram />
      </AuthProvider>,
    );

    const programNameInput = await screen.findByLabelText('Program Name');
    await user.type(programNameInput, 'Web Dev');

    expect(await screen.findByRole('form')).toHaveFormValues({
      name: 'Web Dev',
    });
  });

  it('should submit a new program', async () => {
    const user = userEvent.setup();
    const response = {
      data: {
        id: 1,
      },
    };
    createProgram.mockResolvedValue(response);

    render(
      <AuthProvider>
        <CreateProgram />
      </AuthProvider>,
    );
    const programNameInput = await screen.findByLabelText('Program Name');
    await user.type(programNameInput, 'Web Dev');

    const multiSelect = await screen.findByPlaceholderText('Search Techs');
    await user.click(multiSelect);

    await user.click(await screen.findByText('Python'));

    const form = await screen.findByRole('form');
    form.submit();
    await waitFor(async () => {
      expect(createProgram).toBeCalledWith({ name: 'Web Dev', techs: [1] }, accessToken);
      expect(pushMock).toBeCalledWith(`/programs/${response.data.id}`);
    });
  });

  it('should open and close the modal', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <CreateProgram />
      </AuthProvider>,
    );

    await user.click(await screen.findByText('Add a new Tech'));
    expect(await screen.findByText('Create a Tech')).toBeInTheDocument();

    await user.click(await screen.findByLabelText('close'));
    expect(screen.queryByText('Create a Tech')).toBeNull();
  });
});
