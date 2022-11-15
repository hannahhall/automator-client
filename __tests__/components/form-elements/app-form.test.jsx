import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { AppForm, Input } from '../../../components/form-elements';

const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock });
let props;
describe('AppForm', () => {
  beforeEach(() => {
    props = {
      onSubmit: jest.fn(),
      setErrors: jest.fn(),
      title: 'Create Form',
      cancelRoute: '/go/back/here',
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

  it('should show client errors', async () => {
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

  it('should navigate to the expected route on cancel', async () => {
    const user = userEvent.setup();
    render(
      <AppForm {...props} />,
    );

    await user.click(screen.getByText('Cancel'));
    expect(pushMock).toBeCalledWith(props.cancelRoute);
  });

  it('shows server errors', async () => {
    const user = userEvent.setup();

    const errors = {
      title: 'Title error',
    };

    props.onSubmit = jest.fn().mockRejectedValue({
      response: {
        data: errors,
      },
    });

    render(
      <AppForm {...props} />,
    );

    await user.type(screen.getByLabelText('Project Title'), 'Title');

    await user.click(screen.getByText('Submit'));
    expect(props.setErrors).toBeCalledWith(errors);
  });
});
