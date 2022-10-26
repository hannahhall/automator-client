import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../../../components/form-elements/checkbox';

describe('Checkbox', () => {
  it('should render', () => {
    const props = {
      name: 'check',
      label: 'Checkbox Label',
      onChangeEvent: jest.fn(),
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <Checkbox {...props} />,
    );

    const checkboxEl = screen.getByLabelText(props.label);
    expect(checkboxEl).toBeInTheDocument();
  });

  it('should call the onChangeEvent when clicked', async () => {
    const user = userEvent.setup();
    const mockChange = jest.fn();
    const props = {
      name: 'check',
      label: 'Checkbox Label',
      register: (name) => ({
        name,
        onChange: mockChange,
      }),
    };

    render(
      <Checkbox {...props} />,
    );

    await user.click(screen.getByLabelText(props.label));

    expect(mockChange.mock.calls.length).toBe(1);
  });

  it('should render an error message', () => {
    const props = {
      name: 'check',
      label: 'Checkbox Label',
      error: 'This is wrong',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <Checkbox {...props} />,
    );

    const errorEl = screen.getByText(props.error);
    expect(errorEl).toBeInTheDocument();
  });

  it('should not render an error message', () => {
    const props = {
      name: 'check',
      label: 'Checkbox Label',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
    };

    render(
      <Checkbox {...props} />,
    );

    const errorEl = screen.queryByTestId('error-message');
    expect(errorEl).toBeNull();
  });
});
