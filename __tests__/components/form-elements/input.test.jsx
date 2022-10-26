import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '../../../components/form-elements/input';

describe('Input', () => {
  it('should render', () => {
    const props = {
      name: 'check',
      label: 'Input Label',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <Input {...props} />,
    );

    const inputEl = screen.getByLabelText(props.label);
    expect(inputEl).toBeInTheDocument();
  });

  it('should call the onChangeEvent when clicked', async () => {
    const user = userEvent.setup();
    const mockChange = jest.fn();
    const props = {
      name: 'check',
      label: 'Input Label',
      register: (name) => ({
        name,
        onChange: mockChange,
      }),
    };

    const value = 'test';

    render(
      <Input {...props} />,
    );

    const input = screen.getByLabelText(props.label);

    await user.type(input, value);

    expect(input).toHaveValue(value);

    await waitFor(() => {
      expect(mockChange.mock.calls.length).toBe(value.length);
    });
  });

  it('should render an error message', () => {
    const props = {
      name: 'check',
      label: 'Input Label',
      error: 'This is wrong',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <Input {...props} />,
    );

    const errorEl = screen.getByText(props.error);
    expect(errorEl).toBeInTheDocument();
  });

  it('should not render an error message', () => {
    const props = {
      id: 'check',
      label: 'Input Label',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <Input {...props} />,
    );

    const errorEl = screen.queryByTestId('error-message');
    expect(errorEl).toBeNull();
  });
});
