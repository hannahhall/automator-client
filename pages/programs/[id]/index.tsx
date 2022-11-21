import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';

import CohortList from '../../../components/cohorts/cohort-list';
import Layout from '../../../components/layout';
import NavbarLink from '../../../components/navbar/navbarLink';
import Panel from '../../../components/panel';

import TechList from '../../../components/techs/tech-list';
import { fetchProgram, deleteTechFromProgram } from '../../../data/program';
import { useAuth } from '../../../hooks/useAuth';
import {
  ICohort, Program, Tech,
} from '../../../interfaces';

function ProgramDetail() {
  const router = useRouter();
  const [program, setProgram] = useState<Program>(null);
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [techs, setTechs] = useState<Tech[]>([]);

  const { getAccessToken } = useAuth();

  const getData = () => {
    const { id } = router.query;
    if (id) {
      fetchProgram(id as string).then((res) => {
        const { data } = res;
        setProgram(data);
        setTechs(data.techs);
        setCohorts(data.cohorts);
      });
    }
  };

  useEffect(() => {
    getData();
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

  const removeTech = (tech: Tech) => {
    deleteTechFromProgram(program.id, tech.id, getAccessToken()).then(() => {
      getData();
    });
  };

  return (
    <Layout title={program?.name}>
      <Panel
        heading={program?.name}
        headingRight={<NavbarLink className="button" href={`/programs/${program?.id}/edit`}>Edit</NavbarLink>}
      >
        <section className="section">
          <div className="columns is-multiline">
            {
              program?.cohorts
                ? (
                  <div className="column">
                    <CohortList cohorts={cohorts} search={searchCohorts} />
                  </div>
                ) : null
            }
            {
              program?.techs
                ? (
                  <div className="column">
                    <TechList
                      techs={techs}
                      search={searchTechs}
                      refresh={getData}
                      handleRemoveTech={removeTech}
                    />
                  </div>
                ) : null
            }
          </div>
        </section>
      </Panel>
    </Layout>
  );
}

export default ProgramDetail;
