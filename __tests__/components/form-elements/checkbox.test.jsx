import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../../../components/form-elements/checkbox';

describe('Checkbox', () => {
  it('should render', () => {
    const props = {
      id: 'check',
      label: 'Checkbox Label',
      onChangeEvent: jest.fn(),
    };

    render(
      <Checkbox {...props} />,
    );

    const checkboxEl = screen.getByLabelText(props.label);
    expect(checkboxEl).toBeInTheDocument();
  });

  it('should call the onChangeEvent when clicked', async () => {
    const user = userEvent.setup();
    const props = {
      id: 'check',
      label: 'Checkbox Label',
      onChangeEvent: jest.fn(),
    };

    render(
      <Checkbox {...props} />,
    );

    await user.click(screen.getByLabelText(props.label));

    expect(props.onChangeEvent.mock.calls.length).toBe(1);
  });

  it('should render an error message', () => {
    const props = {
      id: 'check',
      label: 'Checkbox Label',
      error: 'This is wrong',
    };

    render(
      <Checkbox {...props} />,
    );

    const errorEl = screen.getByText(props.error);
    expect(errorEl).toBeInTheDocument();
  });

  it('should not render an error message', () => {
    const props = {
      id: 'check',
      label: 'Checkbox Label',
    };

    render(
      <Checkbox {...props} />,
    );

    const errorEl = screen.queryByTestId('error-message');
    expect(errorEl).toBeNull();
  });
});
