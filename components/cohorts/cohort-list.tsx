import { ChangeEvent, useEffect, useState } from 'react';
import { TCohort, TableProps } from '../../interfaces';
import Panel from '../panel';
import Table from '../table';

interface CohortListProps {
  cohorts: TCohort[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CohortList({ cohorts, search }: CohortListProps) {
  const [cohortTable, setCohortTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const buildRows = (data: TCohort[]) => data.map((cohort) => ({
    key: `cohort-${cohort.id}`,
    data: [
      <a href={`/cohorts/${cohort.id}`}>{cohort.name}</a>,
      cohort.graduation_date,
    ],
  }));

  useEffect(() => {
    if (cohorts) {
      const columns = ['Cohort', 'Graduation Date', ''];
      setCohortTable({
        headers: columns,
        footers: columns,
        rows: buildRows(cohorts),
      });
    }
  }, [cohorts]);

  return (
    <Panel heading="Cohorts" color="is-danger" handleSearch={search} placeholderText="Search Cohorts">
      <div className="panel-block">
        {
          cohortTable?.rows.length
            ? (
              <Table
                headers={cohortTable?.headers}
                footers={cohortTable?.footers}
                rows={cohortTable?.rows}
              />
            )
            : <span>No Cohorts found</span>
        }
      </div>
    </Panel>
  );
}

export default CohortList;
