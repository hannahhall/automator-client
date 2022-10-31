import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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
});
