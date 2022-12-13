import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import {
  ChangeEvent, ReactNode, useEffect, useState,
} from 'react';
import GithubModal from '../../../components/cohorts/github_modal';
import LoadingModal from '../../../components/cohorts/loading-modal';

import Layout from '../../../components/layout';
import NavbarLink from '../../../components/navbar/navbarLink';
import Panel from '../../../components/panel';
import StudentList from '../../../components/student/student-list';

import TechList from '../../../components/techs/tech-list';
import {
  fetchCohort, deleteTechFromCohort, addCohortWebsite, deleteStudentFromCohort,
} from '../../../data/cohort';
import { useAuth } from '../../../hooks/useAuth';
import {
  TCohortDetail, Student, Tech,
} from '../../../interfaces';

function CohortDetail() {
  const router = useRouter();
  const [cohort, setCohortDetail] = useState<TCohortDetail>(null);
  const [techs, setTechs] = useState<Tech[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ message: string, id: number }>(null);

  const { getAccessToken, getGithubAccessToken, setRedirectTo } = useAuth();

  const getData = () => {
    const { id } = router.query;
    if (id) {
      fetchCohort(id as string).then((res) => {
        const { data } = res;
        setCohortDetail(data);
        setTechs(data.techs);
        setStudents(data.students);
      });
    }
  };

  useEffect(() => {
    const githubToken = getGithubAccessToken();
    if (!githubToken) {
      setRedirectTo(router.asPath);
      setShowGithubModal(true);
    }
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
      filteredTechs = cohort.techs as Tech[];
    }
    setTechs(filteredTechs);
  };

  const searchStudents = (event: ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    let filteredStudents: Student[];
    if (value.length > 1) {
      filteredStudents = students.filter((t) => (
        t.full_name.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      filteredStudents = cohort.students;
    }
    setStudents(filteredStudents);
  };

  const removeTech = (tech: Tech) => {
    deleteTechFromCohort(cohort.id, tech.id, getAccessToken()).then(() => {
      getData();
    });
  };

  const deployWebsite = () => {
    setIsLoading(true);
    addCohortWebsite(cohort.id, getAccessToken(), getGithubAccessToken()).then(() => {
      setIsLoading(false);
      getData();
    }).catch((err: AxiosError<{ message: string, id: number }>) => {
      const { response } = err;

      setErrors(response.data);
    });
  };

  const closeGithubModal = () => {
    setShowGithubModal(false);
  };

  const getButtons = (): ReactNode => (
    <div className="buttons">
      {
        !cohort?.is_deployed
          ? <button type="button" className="button navbar-item is-link has-text-weight-bold" onClick={deployWebsite}>Deploy Website</button>
          : null
      }
      <NavbarLink className="button" href={`/cohorts/${cohort?.id}/edit`}>Edit</NavbarLink>
    </div>
  );

  const removeStudent = (studentId: string) => {
    deleteStudentFromCohort(cohort.id, studentId, getAccessToken()).then(() => {
      getData();
    });
  };

  return (
    <Layout title={cohort?.name}>
      <Panel
        heading={cohort?.name}
        headingRight={getButtons()}
      >
        <section className="section">
          <div className="columns is-multiline is-desktop">
            {
              cohort?.students
                ? (
                  <div className="column">
                    <StudentList
                      students={students}
                      studentCount={cohort?.student_count}
                      search={searchStudents}
                      removeStudent={removeStudent}
                    />
                  </div>
                ) : null
            }
            {
              cohort?.techs
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
      {
        showGithubModal
          ? (
            <GithubModal showModal={showGithubModal} closeModal={closeGithubModal} />
          ) : null
      }

      {
        isLoading || errors?.message
          ? (
            <LoadingModal showModal={isLoading || Boolean(errors?.message)} error={errors} />
          ) : null
      }
    </Layout>
  );
}

export default CohortDetail;
