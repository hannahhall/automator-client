import { ChangeEvent, useEffect, useState } from 'react';
import { CohortRead, TableProps } from '../../interfaces';
import Panel from '../panel';
import Table from '../table';

interface CohortListProps {
  cohorts: CohortRead[];
  search: (event: ChangeEvent<HTMLInputElement>) => void;
}

function CohortList({ cohorts, search }: CohortListProps) {
  const [cohortTable, setCohortTable] = useState<TableProps>({
    headers: [],
    footers: [],
    rows: [],
  });

  const buildRows = (data: CohortRead[]) => data.map((cohort) => ({
    key: `cohort-${cohort.id}`,
    data: [
      <a href={`/cohorts/${cohort.id}`}>{cohort.name}</a>,
      cohort.demo_day_readable,
      <span className="icon">
        {cohort.is_deployed
          ? <i className="far fa-check-square" />
          : <i className="far fa-square" />}
      </span>,
    ],
  }));

  useEffect(() => {
    if (cohorts) {
      const columns = ['Cohort', 'Graduation Date', 'Website Deployed?'];
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
