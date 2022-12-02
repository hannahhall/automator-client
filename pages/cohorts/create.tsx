import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { createCohort } from '../../data/cohort';
import { useAuth } from '../../hooks/useAuth';
import { TCohort, Tech } from '../../interfaces';
import CohortForm from '../../components/cohorts/cohort-form';

function CreateCohort() {
  const router = useRouter();
  const { getAccessToken, getGithubAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleCohortSubmit = (cohort: TCohort) => {
    setIsLoading(true);
    const copy = { ...cohort, techs: cohort.techs.map((t: Tech) => t.id) };
    return createCohort(copy, getAccessToken(), getGithubAccessToken()).then((response) => {
      const { data } = response;
      router.push(`/cohorts/${data.id}`);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Layout title="Automator | Create Cohort">
      <CohortForm
        title="Create a Cohort"
        handleSubmit={handleCohortSubmit}
        cancelRoute="/"
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default CreateCohort;
