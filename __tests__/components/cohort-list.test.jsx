import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import CohortList from '../../components/cohorts/cohort-list';

let props;
let cohorts;
describe('CohortList', () => {
  beforeEach(() => {
    cohorts = [
      {
        id: 1,
        name: 'Web Dev Python',
      },
      {
        id: 2,
        name: 'Web Dev C#',
      },
    ];

    props = {
      title: 'Cohorts',
      cohorts,
    };
  });
  it('should render', () => {
    render(
      <CohortList {...props} />,
    );

    const cohortListTitle = screen.getByText(props.title);
    expect(cohortListTitle).toBeInTheDocument();
  });
});
