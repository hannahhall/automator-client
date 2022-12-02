import { useState, useEffect } from 'react';
import { fetchCohorts } from '../data/cohort';
import { CohortRead } from '../interfaces';
import CohortList from './cohorts/cohort-list';
import ProgramList from './programs/list';

function InstructorIndex() {
  const [cohorts, setCohorts] = useState<CohortRead[]>(null);

  useEffect(() => {
    fetchCohorts().then((res) => {
      setCohorts(res.data);
    });
  }, []);

  const searchCohorts = (event) => {
    const search = event.target.value;

    fetchCohorts(search).then((res) => {
      setCohorts(res.data);
    });
  };

  return (
    <>
      <div className="column is-half-widescreen">
        <ProgramList />
      </div>
      <div className="column is-half-widescreen">
        <CohortList search={searchCohorts} cohorts={cohorts} />
      </div>
    </>
  );
}

export default InstructorIndex;
