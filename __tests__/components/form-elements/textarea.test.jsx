import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Textarea from '../../../components/form-elements/textarea';

describe('Textarea', () => {
  it('should render', () => {
    const props = {
      id: 'check',
      label: 'Textarea Label',
      onChangeEvent: jest.fn(),
      isRequired: false
    };

    render(
      <Textarea {...props} />
    );

    const textareaEl = screen.getByLabelText(props.label);
    expect(textareaEl).toBeInTheDocument();
  });

  it('should call the onChangeEvent when clicked', async () => {
    const user = userEvent.setup();
    const props = {
      id: 'check',
      label: 'Textarea Label',
      onChangeEvent: jest.fn(),
      isRequired: false
    };

    const value = 'test';

    render(
      <Textarea {...props} />
    );

    const textarea = screen.getByLabelText(props.label);

    await user.type(textarea, value);

    expect(textarea).toHaveValue(value);

    await waitFor(() => {
      expect(props.onChangeEvent.mock.calls.length).toBe(value.length);
    });
  });

  it('should render an error message', () => {
    const props = {
      id: 'check',
      label: 'Textarea Label',
      error: 'This is wrong'
    };

    render(
      <Textarea {...props} />
    );

    const errorEl = screen.getByText(props.error);
    expect(errorEl).toBeInTheDocument();
  });

  it('should not render an error message', () => {
    const props = {
      id: 'check',
      label: 'Textarea Label',
    };

    render(
      <Textarea {...props} />
    );

    const errorEl = screen.queryByTestId('error-message');
    expect(errorEl).toBeNull();
  });
});
