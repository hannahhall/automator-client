import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TechList from '../../components/techs/tech-list';

let props;
let techs;
describe('TechList', () => {
  beforeEach(() => {
    techs = [
      {
        id: 1,
        text: 'Python',
        square_icon: 'http://test.com',
      },
      {
        id: 2,
        text: 'C#',
        square_icon: 'http://test.com',
      },
    ];

    props = {
      techs,
    };
  });

  it('should render', () => {
    render(
      <TechList {...props} />,
    );

    const techListTitle = screen.getByText('Current Techs');
    expect(techListTitle).toBeInTheDocument();
  });

  it('should open/close the edit tech modal', async () => {
    props.refresh = jest.fn();
    const user = userEvent.setup();
    render(
      <TechList {...props} />,
    );

    await user.click(screen.getAllByText('Edit')[0]);
    expect(screen.getByText(`Edit ${techs[0].text}`)).toBeInTheDocument();

    await user.click(screen.getByLabelText('close'));

    expect(screen.queryByText(`Edit ${techs[0].text}`)).toBeNull();
    expect(props.refresh).toBeCalled();
  });
});
