import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CreateTechModal from '../../components/techs/create-tech-modal';
import { createTech } from '../../data/tech';
import { AuthContext } from '../../hooks/useAuth';

const accessToken = 'Test1234';

const mockValue = {
  getAccessToken: jest.fn(() => accessToken),
};

let mockShowModal; let
  mockCloseModal;

jest.mock('../../data/tech', () => ({
  createTech: jest.fn(),
}));

describe('Create Tech Modal', () => {
  beforeEach(() => {
    mockShowModal = true;
    mockCloseModal = jest.fn();
  });
  it('renders', () => {
    render(
      <AuthContext.Provider value={mockValue}>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthContext.Provider>,
    );
    const modalElement = screen.getByRole('alertdialog');

    expect(modalElement).toBeInTheDocument();
    expect(modalElement.classList).toContain('is-active');
  });

  it('hides when not shown', () => {
    mockShowModal = false;
    render(
      <AuthContext.Provider value={mockValue}>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthContext.Provider>,
    );
    const modalElement = screen.getByRole('alertdialog');
    expect(modalElement.classList).not.toContain('is-active');
  });

  it('submits a new tech', async () => {
    const user = userEvent.setup();

    const response = {
      data: {
        id: 1,
      },
    };
    createTech.mockResolvedValue(response);

    render(
      <AuthContext.Provider value={mockValue}>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthContext.Provider>,
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
      response: {
        data: {
          text: textError,
          icon: iconError,
        },
      },
    };
    createTech.mockRejectedValue(error);

    render(
      <AuthContext.Provider value={mockValue}>
        <CreateTechModal showModal={mockShowModal} closeModal={mockCloseModal} />
      </AuthContext.Provider>,
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
