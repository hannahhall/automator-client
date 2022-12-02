import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Router from 'next/router';
import userEvent from '@testing-library/user-event';

import CohortForm from '../../components/cohorts/cohort-form';
import { fetchProgram, fetchPrograms } from '../../data/program';
import { fetchTechs } from '../../data/tech';
import { AuthContext } from '../../hooks/useAuth';
import { mockDataSuccess, mockFetchToken } from '../mocks';

const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/cohort/create' });
jest.mock('../../data/program', () => ({
  fetchPrograms: jest.fn(),
  fetchProgram: jest.fn(),
}));
jest.mock('../../data/tech', () => ({
  fetchTechs: jest.fn(),
}));
jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));

let props;
let programs;
let techs;
let token;
let mockUseAuth;

describe('CohortForm', () => {
  beforeEach(() => {
    mockUseAuth = {
      getGithubAccessToken: jest.fn().mockReturnValue('12345'),
      setRedirectTo: jest.fn(),
    };
    props = {
      title: 'Create Cohort',
      isLoading: false,
      initialData: {
        name: 'Day Cohort 13',
        program: 1,
        slack_channel: 'day-cohort-13',
        github_organization: 'day-cohort-13',
        demo_day: '2022-12-12',
        demo_day_time: '08:00',
      },
      handleSubmit: jest.fn(),
      cancelRoute: '/',
    };

    token = '12345';

    programs = [
      {
        id: 1,
        name: 'Web Dev',
        techs: [1],
      },
    ];
    techs = [
      {
        id: 1,
        name: 'Python',
      },
    ];

    mockDataSuccess(fetchPrograms, programs);
    mockDataSuccess(fetchProgram, programs[0]);
    mockDataSuccess(fetchTechs, techs);
    mockFetchToken(token);
  });

  it('should render', async () => {
    render(
      <AuthContext.Provider value={mockUseAuth}>
        <CohortForm {...props} />
      </AuthContext.Provider>,
    );

    expect(await screen.findByText(props.title)).toBeInTheDocument();
    expect(screen.queryByText('Authenticate with Github?')).toBeNull();
  });

  it('should render the github modal', async () => {
    mockUseAuth.getGithubAccessToken = jest.fn().mockReturnValue(null);
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={mockUseAuth}>
        <CohortForm {...props} />
      </AuthContext.Provider>,
    );

    expect(await screen.findByText('Authenticate with Github?')).toBeInTheDocument();

    await user.click(screen.getByLabelText('close'));
    expect(pushMock).toBeCalledWith('/');
  });

  it('should open and close the tech modal', async () => {
    const user = userEvent.setup();
    render(
      <AuthContext.Provider value={mockUseAuth}>
        <CohortForm {...props} />
      </AuthContext.Provider>,
    );

    await user.click(await screen.findByText('Add a new Tech'));

    const techModalHeading = () => screen.queryByText('Create a Tech');

    expect(techModalHeading()).toBeInTheDocument();

    await user.click(screen.getByLabelText('close'));

    expect(techModalHeading()).toBeNull();
  });
});
