import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AppForm, Input } from '../../../components/form-elements';

let props;
describe('AppForm', () => {
  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      setErrors: jest.fn(),
      title: 'Create Form',
      onCancel: jest.fn(),
      children: ({ register }) => (
        <Input
          name="title"
          register={register}
          label="Project Title"
          isRequired
        />
      ),
    };
  });

  it('should render', () => {
    render(
      <AppForm {...props} />,
    );

    const formHeading = screen.getByText(props.title);
    expect(formHeading).toBeInTheDocument();
  });

  it('should set errors', async () => {
    const requiredText = 'This field is required';
    render(
      <AppForm {...props} />,
    );

    const form = screen.getByRole('form');
    await form.submit();
    await waitFor(() => {
      expect(props.setErrors).toBeCalledWith({
        title: requiredText,
      });
    });
  });
});
