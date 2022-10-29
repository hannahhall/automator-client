import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchPrograms } from '../../data/program';
import ProgramList from '../../components/programs/list';
import { mockDataSuccess } from '../mocks';

jest.mock('../../data/program', () => ({
  fetchPrograms: jest.fn(),
}));

let programs;
describe('ProgramList', () => {
  beforeEach(() => {
    programs = [
      {
        id: 1,
        name: 'Web Dev',
      },
    ];
    mockDataSuccess(fetchPrograms, programs);
  });

  it('should render', async () => {
    render(<ProgramList />);

    expect(await screen.findByText(programs[0].name)).toBeInTheDocument();
    expect(fetchPrograms).toBeCalledWith('');
  });

  it('should search when text is long enough', async () => {
    const user = userEvent.setup();

    render(<ProgramList />);
    fetchPrograms.mockClear();

    const searchEl = await screen.findByPlaceholderText('Search');
    const value = 'test';
    await user.type(searchEl, value);

    expect(fetchPrograms).toBeCalledWith('te');
    expect(fetchPrograms).toBeCalledWith('tes');
    expect(fetchPrograms).toBeCalledWith('test');
  });
});
