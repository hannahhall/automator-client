import '@testing-library/jest-dom';
import {
  cleanup, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import { createCohort } from '../../data/cohort';
import { fetchProgram, fetchPrograms } from '../../data/program';
import { fetchTechs } from '../../data/tech';
import { AuthContext, AuthProvider } from '../../hooks/useAuth';
import CreateCohort from '../../pages/cohorts/create';
import { mockDataRejection, mockDataSuccess, mockFetchToken } from '../mocks';

const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/edit' });

jest.mock('../../data/program', () => ({
  fetchPrograms: jest.fn(),
  fetchProgram: jest.fn(),
}));
jest.mock('../../data/tech', () => ({
  fetchTechs: jest.fn(),
}));
jest.mock('../../data/cohort', () => ({
  createCohort: jest.fn(),
}));
jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));

let programs;
let techs;
let token;
let githubToken;
let mockUseAuth;
let cohort;

const fillOutForm = async (user, cohortValues) => {
  const nameInput = await screen.findByLabelText('Cohort Name');
  await user.type(nameInput, cohortValues.name);
  const programInput = await screen.findByLabelText('Select Program');
  await user.selectOptions(programInput, cohortValues.program);

  const slackChannelInput = await screen.findByLabelText('Slack Channel');
  await user.type(slackChannelInput, cohortValues.slack_channel);
  const githubInput = await screen.findByLabelText('Github Organization');
  await user.type(githubInput, cohortValues.github_organization);
  const demoDayInput = await screen.findByPlaceholderText('Date of Demo day');
  await user.type(demoDayInput, cohortValues.demo_day);

  const deployCheck = await screen.findByLabelText('Deploy Website?');
  await user.click(deployCheck);
};

describe('CreateCohort', () => {
  beforeEach(() => {
    token = '12345';
    githubToken = '67890';
    mockUseAuth = {
      getGithubAccessToken: jest.fn().mockReturnValue(githubToken),
      getAccessToken: jest.fn().mockReturnValue(token),
      setRedirectTo: jest.fn(),
      getIsAuthenticated: jest.fn().mockReturnValue(true),
      getUser: jest.fn().mockReturnValue({ is_staff: true }),
    };

    programs = [
      {
        id: '1',
        name: 'Web Dev',
        techs: [{
          id: 1,
          text: 'Python',
        }],
      },
    ];
    techs = [
      {
        id: 1,
        text: 'Python',
      },
    ];

    cohort = {
      name: 'Day Cohort 13',
      program: '1',
      techs: [1],
      slack_channel: 'day-cohort-13',
      github_organization: 'day-cohort-13',
      demo_day: '2022-12-12',
      is_deployed: true,
    };

    mockDataSuccess(fetchPrograms, programs);
    mockDataSuccess(fetchProgram, programs[0]);
    mockDataSuccess(fetchTechs, techs);
    mockDataSuccess(createCohort, { id: 1 });
    mockFetchToken(token);
  });
  afterEach(cleanup);

  it('should render', async () => {
    render(
      <AuthProvider>
        <CreateCohort />
      </AuthProvider>,
    );

    const heading = await screen.findByRole('heading', {
      name: 'Create a Cohort',
    });

    expect(heading).toBeInTheDocument();
  });

  it('should submit the form', async () => {
    const user = userEvent.setup();

    render(
      <AuthContext.Provider value={mockUseAuth}>
        <CreateCohort />
      </AuthContext.Provider>,
    );

    await fillOutForm(user, cohort);
    await user.click(screen.getByText('Submit'));

    expect(createCohort).toBeCalledWith(cohort, token, githubToken);
    expect(pushMock).toBeCalledWith('/cohorts/1');
  });

  it('should show server errors', async () => {
    const error = {
      id: 1,
      message: 'You need permission to change the github org',
    };
    mockDataRejection(createCohort, error);

    const user = userEvent.setup();

    render(
      <AuthContext.Provider value={mockUseAuth}>
        <CreateCohort />
      </AuthContext.Provider>,
    );

    await fillOutForm(user, cohort);
    await user.click(screen.getByText('Submit'));

    expect(await screen.findByText(error.message)).toBeInTheDocument();
  });
});
