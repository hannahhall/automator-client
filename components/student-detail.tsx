import { useEffect, useState } from 'react';
import Panel from './panel';
import {
  TableProps, TableRow, IStudentDetail,
} from '../interfaces';
import Table from './table';

interface StudentDetailProps {
  student: IStudentDetail
}

function StudentDetail({ student }: StudentDetailProps) {
  const [userTable, setUserTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const createUserTable = () => {
    const columns = ['data', 'value'];
    const rows: TableRow[] = Object.entries(student)
      .filter((field) => field[0] !== 'circle_image')
      .map(([key, field]): TableRow => ({
        key: `user-${key}`,
        data: [field.verbose_name, field.value],
      }));

    setUserTable({
      headers: columns,
      footers: columns,
      rows,
    });
  };

  useEffect(() => {
    if (student) {
      createUserTable();
    }
  }, [student]);

  return (
    <Panel
      heading="My Info"
      color="is-warning"
    >
      <Table
        headers={userTable.headers}
        footers={userTable.footers}
        rows={userTable.rows}
      />

    </Panel>
  );
}

export default StudentDetail;
