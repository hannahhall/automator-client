import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Select from '../../../components/form-elements/select';

describe('Select', () => {
  it('should render', () => {
    const props = {
      name: 'check',
      label: 'Select Label',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
      options: [
        {
          id: 1,
          name: 'Option 1',
        },
      ],
    };

    render(
      <Select {...props} />,
    );

    const selectEl = screen.getByLabelText(props.label);
    expect(selectEl).toBeInTheDocument();
  });

  it('should call the onChangeEvent when clicked', async () => {
    const user = userEvent.setup();
    const mockChange = jest.fn();
    const props = {
      name: 'check',
      label: 'Select Label',
      register: (name) => ({
        name,
        onChange: mockChange,
      }),
      options: [
        {
          id: 1,
          name: 'Option 1',
        },
      ],
    };

    render(
      <Select {...props} />,
    );

    const select = screen.getByLabelText(props.label);
    const option = props.options[0].name;
    await user.selectOptions(select, option);

    expect(screen.getByRole('option', { name: option }).selected).toBe(true);

    await waitFor(() => {
      expect(mockChange.mock.calls.length).toBe(1);
    });
  });

  it('should render an error message', () => {
    const props = {
      name: 'check',
      label: 'Select Label',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
      options: [
        {
          id: 1,
          name: 'Option 1',
        },
      ],
      error: 'This is wrong',
    };

    render(
      <Select {...props} />,
    );

    const errorEl = screen.getByText(props.error);
    expect(errorEl).toBeInTheDocument();
  });

  it('should not render an error message', () => {
    const props = {
      id: 'check',
      label: 'Select Label',
      register: (name) => ({
        name,
        onChange: jest.fn(),
      }),
      options: [
        {
          id: 1,
          name: 'Option 1',
        },
      ],
    };

    render(
      <Select {...props} />,
    );

    const errorEl = screen.queryByTestId('error-message');
    expect(errorEl).toBeNull();
  });
});
