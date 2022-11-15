import '@testing-library/jest-dom';
import {
  cleanup, render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Router from 'next/router';
import ProgramDetail from '../../pages/programs/[id]/index';
import { AuthProvider } from '../../hooks/useAuth';
import {
  mockDataSuccess,
  mockFetchToken,
} from '../mocks';
import { fetchProgram, deleteTechFromProgram } from '../../data/program';

jest.mock('../../data/tech', () => ({
  fetchTechs: jest.fn(),
}));
jest.mock('../../data/auth', () => ({
  fetchNewToken: jest.fn(),
  fetchUser: jest.fn().mockResolvedValue({}),
}));
jest.mock('../../data/program', () => ({
  fetchProgram: jest.fn(),
  deleteTechFromProgram: jest.fn(),
}));
const pushMock = jest.fn();
jest.spyOn(Router, 'useRouter').mockReturnValue({ push: pushMock, pathname: '/programs/1', query: { id: 1 } });

let program;
let accessToken;
let techs;
let cohorts;
describe('Program Detail', () => {
  beforeEach(() => {
    techs = [
      { id: 1, text: 'Python', square_icon: 'http://google.com' },
      { id: 2, text: 'C#', square_icon: 'http://google.com' },
    ];
    cohorts = [
      { id: 1, name: 'Day Cohort 13' },
      { id: 2, name: 'Day Cohort 12' },
    ];
    program = {
      id: 1,
      name: 'Web Dev',
      techs,
      cohorts,
    };
    accessToken = 'test1234';
    jest.clearAllMocks();

    mockDataSuccess(fetchProgram, program);
    mockFetchToken(accessToken);
  });

  afterEach(cleanup);

  it('renders a heading', async () => {
    render(
      <AuthProvider>
        <ProgramDetail />
      </AuthProvider>,
    );

    const heading = await screen.findByText(program.name);

    expect(heading).toBeInTheDocument();
  });

  it('filters programs and resets list', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <ProgramDetail />
      </AuthProvider>,
    );
    expect(await screen.findByText(cohorts[1].name)).toBeInTheDocument();
    const input = await screen.findByPlaceholderText('Search Cohorts');
    await user.type(input, '13');
    expect(await screen.findByText(cohorts[0].name)).toBeInTheDocument();
    expect(screen.queryByText(cohorts[1].name)).toBeNull();

    await user.type(input, '{backspace}');
    expect(await screen.findByText(techs[1].text)).toBeInTheDocument();
  });

  it('filters techs and resets list', async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider>
        <ProgramDetail />
      </AuthProvider>,
    );
    expect(await screen.findByText(techs[1].text)).toBeInTheDocument();
    const input = await screen.findByPlaceholderText('Search Techs');
    await user.type(input, 'Py');
    expect(await screen.findByText(techs[0].text)).toBeInTheDocument();
    expect(screen.queryByText(techs[1].text)).toBeNull();

    await user.type(input, '{backspace}');
    expect(await screen.findByText(techs[1].text)).toBeInTheDocument();
  });

  it('should delete a tech', async () => {
    const user = userEvent.setup();
    mockDataSuccess(deleteTechFromProgram, {});
    render(
      <AuthProvider>
        <ProgramDetail />
      </AuthProvider>,
    );

    const tech = techs[0];

    await user.click(await screen.findByTestId(`delete-${tech.id}`));
    await user.click(screen.getByText(`Delete ${tech.text}`));
    expect(deleteTechFromProgram).toBeCalledWith(program.id, tech.id, accessToken);
  });
});
