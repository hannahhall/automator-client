import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import StudentDetail from '../../components/student/student-detail';

let props;
let student;

describe('StudentDetail', () => {
  beforeEach(() => {
    student = {
      id: 1,
      first_name: {
        verbose_name: 'First Name',
        value: 'Test',
      },
      circle_image: {
        verbose_name: 'Image',
        value: 'test.com',
      },
    };
    props = { student };
  });

  it('should render the table with expected data', () => {
    render(
      <StudentDetail {...props} />,
    );

    const studentDetailTitle = screen.getByText('My Info');
    expect(studentDetailTitle).toBeInTheDocument();

    const firstNameTh = screen.getByText(student.first_name.verbose_name);
    const firstNameTd = screen.getByText(student.first_name.value);
    const circleImage = screen.queryByText(student.circle_image.verbose_name);

    expect(firstNameTh).toBeInTheDocument();
    expect(firstNameTd).toBeInTheDocument();
    expect(circleImage).toBeNull();
  });
});
