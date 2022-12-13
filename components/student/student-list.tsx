import { ChangeEvent, useEffect, useState } from 'react';
import { Student, TableProps } from '../../interfaces';
import Panel from '../panel';
import Table from '../table';

interface StudentListProps {
  students: Student[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
  studentCount: number;
  removeStudent: (studentId: string) => void;
}

function StudentList({
  students, search, studentCount, removeStudent,
}: StudentListProps) {
  const [studentTable, setStudentTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const buildRows = (data: Student[]) => data.map((student) => ({
    key: `student-${student.student_id}`,
    data: [
      student.full_name,
      <span className="icon is-medium">
        {student.is_complete
          ? <i className="far fa-check-square fa-lg" />
          : <i className="far fa-square fa-lg" />}
      </span>,
      <button className="button is-ghost" type="button" onClick={() => removeStudent(student.student_id)}>
        <span className="icon has-text-danger is-medium">
          <i className="fas fa-trash fa-lg" />
        </span>
      </button>,
    ],
  }));

  useEffect(() => {
    if (students) {
      const columns = ['Student', 'Profile Completed?', ''];
      setStudentTable({
        headers: columns,
        footers: columns,
        rows: buildRows(students),
      });
    }
  }, [students]);

  return (
    <Panel
      heading="Students"
      headingRight={(
        <p>
          Count:&nbsp;
          {studentCount}
        </p>
      )}
      color="is-danger"
      handleSearch={search}
      placeholderText="Search Students"
    >
      <div className="panel-block">
        {
          studentTable?.rows.length
            ? (
              <Table
                headers={studentTable?.headers}
                footers={studentTable?.footers}
                rows={studentTable?.rows}
              />
            )
            : <span>No Students found</span>
        }
      </div>
    </Panel>
  );
}

export default StudentList;
