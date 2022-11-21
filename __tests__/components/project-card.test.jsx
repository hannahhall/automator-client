import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProjectCard from '../../components/projects/project-card';

let props;
let project;

describe('ProjectCard', () => {
  beforeEach(() => {
    project = {
      id: 1,
      title: 'My Project',
    };
    props = {
      project,
      handleDelete: jest.fn(),
    };
  });

  it('should render', () => {
    render(
      <ProjectCard {...props} />,
    );

    const projectCardTitle = screen.getByText(props.project.title);
    expect(projectCardTitle).toBeInTheDocument();
  });

  it('should call the handle delete button on click', async () => {
    const user = userEvent.setup();

    render(
      <ProjectCard {...props} />,
    );

    await user.click(screen.getByTestId(`delete-project-${project.id}`));

    expect(props.handleDelete).toBeCalledWith(project.id);
  });
});
