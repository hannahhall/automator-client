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
});
