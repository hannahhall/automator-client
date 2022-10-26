import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';

import CreateTechModal from '../../components/techs/create-tech-modal';
import { fetchNewToken } from '../../data/auth';
import { createTech } from '../../data/tech';
import { AuthProvider } from '../../hooks/useAuth';
import { mockDataRejection, mockDataSuccess, mockFetchToken } from '../mocks';

let mockShowModal;
let mockCloseModal;
let accessToken;

jest.spyOn(Router, 'useRouter').mockReturnValue({ push: jest.fn(), pathname: '/programs/create' });

jest.mock('../../data/tech', () => ({
  createTech: jest.fn(),
}));

jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));

describe('Create Tech Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockShowModal = true;
    mockCloseModal = jest.fn();
    accessToken = 'Test1234';
    mockFetchToken(accessToken);
  });

  it('renders', async () => {
    render(
      <AuthProvider>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthProvider>,
    );
    const modalElement = await screen.findByRole('alertdialog');

    expect(modalElement).toBeInTheDocument();
    expect(modalElement.classList).toContain('is-active');
  });

  it('hides when not shown', async () => {
    mockShowModal = false;
    render(
      <AuthProvider>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthProvider>,
    );
    const modalElement = await screen.findByRole('alertdialog');
    expect(modalElement.classList).not.toContain('is-active');
  });

  it('submits a new tech', async () => {
    const user = userEvent.setup();

    const data = {
      id: 1,
    };

    mockDataSuccess(createTech, data);

    render(
      <AuthProvider>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthProvider>,
    );

    const techName = 'Python';
    const input = screen.getByLabelText('Tech Name');

    await user.type(input, techName);

    const fakeFile = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInputEl = screen.getByTestId('file-input');

    await user.upload(fileInputEl, fakeFile);

    const buttonEl = screen.getByText('Save Tech');
    await user.click(buttonEl);
    await waitFor(async () => {
      expect(createTech).toBeCalledWith({ text: techName, icon: fakeFile }, accessToken);
    });
  });

  it('shows errors after submit', async () => {
    const user = userEvent.setup();
    const textError = 'Too Long';
    const iconError = 'Wrong Format';
    const error = {
      text: textError,
      icon: iconError,
    };

    mockDataRejection(createTech, error);

    render(
      <AuthProvider>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthProvider>,
    );
    const techName = 'Python';
    const input = screen.getByLabelText('Tech Name');
    await user.type(input, techName);

    const buttonEl = screen.getByText('Save Tech');
    await user.click(buttonEl);
    await waitFor(async () => {
      expect(screen.getByText(textError)).toBeInTheDocument();
      expect(screen.getByText(iconError)).toBeInTheDocument();
    });
  });
});
