import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingModal from '../../components/cohorts/loading-modal';

let props;
describe('LoadingModal', () => {
  beforeEach(() => {
    props = {
      showModal: true,
      errors: {},
    };
  });

  it('should render', () => {
    render(<LoadingModal {...props} />);

    expect(screen.getByText('Creating github repo...')).toBeInTheDocument();
  });

  it('should show errors', () => {
    props.error = {
      id: 1,
      message: 'Something happened',
    };

    render(<LoadingModal {...props} />);

    expect(screen.getByText(props.error.message)).toBeInTheDocument();
  });
});
