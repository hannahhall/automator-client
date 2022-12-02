import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GithubModal from '../../components/cohorts/github_modal';

let showModal;
let closeModal;
describe('Github Modal', () => {
  beforeEach(() => {
    showModal = true;
    closeModal = jest.fn();
  });

  it('should render', () => {
    render(<GithubModal showModal={showModal} closeModal={closeModal} />);
    const heading = screen.getByText('Authenticate with Github?');
    expect(heading).toBeInTheDocument();
  });

  it('should close the modal', async () => {
    const user = userEvent.setup();
    render(<GithubModal showModal={showModal} closeModal={closeModal} />);

    await user.click(screen.getByLabelText('close'));

    expect(closeModal).toBeCalled();
  });
});
