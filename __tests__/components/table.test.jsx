import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Table from '../../components/table';

let props;
describe('Panel', () => {
  beforeEach(() => {
    props = {
      headers: ['First', 'Second'],
      footers: ['First Footer', 'Second Footer'],
      rows: [
        {
          key: 1,
          data: ['apple', 'orange'],
        },
        {
          key: 2,
          data: ['banana', 'pineapple'],
        },
      ],
    };
  });

  it('should render', () => {
    render(<Table {...props} />);

    props.headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });

    props.footers.forEach((footer) => {
      expect(screen.getByText(footer)).toBeInTheDocument();
    });

    props.rows.forEach((row) => {
      row.data.forEach((td) => {
        expect(screen.getByText(td)).toBeInTheDocument();
      });
    });
  });
});
