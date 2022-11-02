import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';

import TechModalForm from '../../components/techs/tech-modal-form';
import { createTech, updateTech } from '../../data/tech';
import { AuthProvider } from '../../hooks/useAuth';
import { mockDataRejection, mockDataSuccess, mockFetchToken } from '../mocks';

let mockShowModal;
let mockCloseModal;
let accessToken;

jest.spyOn(Router, 'useRouter').mockReturnValue({ push: jest.fn(), pathname: '/programs/create' });

jest.mock('../../data/tech', () => ({
  createTech: jest.fn(),
  updateTech: jest.fn(),
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
        <TechModalForm showModal={mockShowModal} closeModal={mockCloseModal} />
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
        <TechModalForm showModal={mockShowModal} closeModal={mockCloseModal} />
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
        <TechModalForm showModal={mockShowModal} closeModal={mockCloseModal} />
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
        <TechModalForm showModal={mockShowModal} closeModal={mockCloseModal} />
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

  it('fills in initial data', async () => {
    const initialData = {
      id: 1,
      text: 'Python',
    };

    render(
      <AuthProvider>
        <TechModalForm
          showModal={mockShowModal}
          closeModal={mockCloseModal}
          initialData={initialData}
        />
      </AuthProvider>,
    );

    const input = await screen.findByLabelText('Tech Name');
    expect(input.value).toBe(initialData.text);

    expect(screen.getByText(`Edit ${initialData.text}`)).toBeInTheDocument();
  });

  it('calls the update method on save', async () => {
    const user = userEvent.setup();

    const data = {
      id: 1,
    };

    mockDataSuccess(updateTech, data);

    const initialData = {
      id: 1,
      text: 'Python',
      icon: undefined,
    };

    render(
      <AuthProvider>
        <TechModalForm
          showModal={mockShowModal}
          closeModal={mockCloseModal}
          initialData={initialData}
        />
      </AuthProvider>,
    );

    const input = screen.getByLabelText('Tech Name');
    const extra = ' Updated';
    await user.type(input, extra);

    const buttonEl = screen.getByText('Save Tech');
    await user.click(buttonEl);

    expect(updateTech).toBeCalledWith(
      initialData.id,
      { icon: initialData.icon, id: initialData.id, text: initialData.text + extra },
      accessToken,
    );

    expect(mockCloseModal).toBeCalled();
  });
});
