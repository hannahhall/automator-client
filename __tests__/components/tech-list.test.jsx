import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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

    await user.click(screen.getByTestId(`edit-${techs[0].id}`));
    expect(screen.getByText(`Edit ${techs[0].text}`)).toBeInTheDocument();

    await user.click(screen.getByLabelText('close'));

    expect(screen.queryByText(`Edit ${techs[0].text}`)).toBeNull();
    expect(props.refresh).toBeCalled();
  });

  it('should open/close the delete tech modal', async () => {
    props.refresh = jest.fn();
    const user = userEvent.setup();
    render(
      <TechList {...props} />,
    );

    await user.click(screen.getByTestId(`delete-${techs[0].id}`));
    expect(screen.getByText(`Delete ${techs[0].text}?`)).toBeInTheDocument();

    await user.click(screen.getByLabelText('close'));

    expect(screen.queryByText(`Delete ${techs[0].text}?`)).toBeNull();
    expect(props.refresh).toBeCalled();
  });

  it('should delete a tech', async () => {
    props.handleRemoveTech = jest.fn();

    const user = userEvent.setup();
    render(
      <TechList {...props} />,
    );

    await user.click(screen.getByTestId(`delete-${techs[0].id}`));
    expect(screen.getByText(`Delete ${techs[0].text}?`)).toBeInTheDocument();

    await user.click(screen.getByText(`Delete ${techs[0].text}`));

    expect(props.handleRemoveTech).toBeCalledWith(techs[0]);

    expect(screen.queryByText(`Delete ${techs[0].text}?`)).toBeNull();
  });
});
