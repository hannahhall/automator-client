import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Panel from '../../components/panel';

let props;
describe('Panel', () => {
  beforeEach(() => {
    props = {
      heading: 'Panel Heading',
      links: [
        {
          id: 1,
          href: '/programs/1',
          text: 'Web Dev',
        },
      ],
    };
  });
  it('should render', () => {
    render(
      <Panel {...props} />,
    );

    const panelHeading = screen.getByText(props.heading);
    expect(panelHeading).toBeInTheDocument();
  });

  it('should search', async () => {
    props.handleSearch = jest.fn();
    const user = userEvent.setup();

    render(
      <Panel {...props} />,
    );

    const searchEl = screen.getByPlaceholderText('Search');
    const value = 'Test';
    await user.type(searchEl, value);

    expect(props.handleSearch).toBeCalledTimes(value.length);
  });

  it('should filter', async () => {
    props.handleFilter = jest.fn();
    props.filters = ['All', 'Odd', 'Even'];
    const user = userEvent.setup();

    render(
      <Panel {...props} />,
    );

    const filterEl = screen.getByText(props.filters[1]);
    await user.click(filterEl);

    expect(props.handleFilter).toBeCalled();
  });
});
