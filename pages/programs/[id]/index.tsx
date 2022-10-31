import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

import CohortList from '../../../components/cohorts/cohort-list';
import Layout from '../../../components/layout';
import TechList from '../../../components/techs/tech-list';
import { fetchProgram } from '../../../data/program';
import {
  ICohort, Program, Tech,
} from '../../../interfaces';

function ProgramDetail() {
  const router = useRouter();
  const [program, setProgram] = useState<Program>(null);
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [techs, setTechs] = useState<Tech[]>([]);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchProgram(id as string).then((res) => {
        const { data } = res;
        setProgram(data);
        setTechs(data.techs);
        setCohorts(data.cohorts);
      });
    }
  }, [router.query]);

  const searchTechs = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    let filteredTechs: Tech[];
    if (value.length > 1) {
      filteredTechs = techs.filter((t) => (
        t.text.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      filteredTechs = program.techs as Tech[];
    }
    setTechs(filteredTechs);
  };

  const searchCohorts = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    let filteredCohorts: ICohort[];
    if (value.length > 1) {
      filteredCohorts = cohorts.filter((t) => (
        t.name.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      filteredCohorts = program.cohorts;
    }
    setCohorts(filteredCohorts);
  };

  return (
    <Layout title={program?.name}>
      <div className="columns">
        {
          program?.cohorts
            ? (
              <div className="column">
                <CohortList title={program.name} cohorts={cohorts} search={searchCohorts} />
              </div>
            ) : null
        }
        {
          program?.techs
            ? (
              <div className="column">
                <TechList techs={techs} search={searchTechs} />
              </div>
            ) : null
        }
      </div>
    </Layout>
  );
}

export default ProgramDetail;
