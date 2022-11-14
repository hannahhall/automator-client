import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

import ProjectForm from '../../components/projects/project-form';

let props;

describe('ProjectForm', () => {
  beforeEach(() => {
    props = {
      title: 'Create a Project',
      setErrors: jest.fn(),
    };
  });

  it('should render', () => {
    render(
      <ProjectForm {...props} />,
    );

    const projectFormTitle = screen.getByText(props.title);
    expect(projectFormTitle).toBeInTheDocument();
  });

  it('should set errors', async () => {
    const requiredText = 'This field is required';
    render(
      <ProjectForm {...props} />,
    );
    props.setErrors.mockClear();

    const form = screen.getByRole('form');
    await form.submit();
    await waitFor(() => {
      expect(props.setErrors).toBeCalledWith({
        github_url: requiredText,
        description: requiredText,
        title: requiredText,
      });
    });
  });
});
