import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { fetchCohort, updateCohort } from '../../../data/cohort';
import { useAuth } from '../../../hooks/useAuth';
import { TCohort, Tech } from '../../../interfaces';
import CohortForm from '../../../components/cohorts/cohort-form';

function EditCohort() {
  const [initialData, setInitialData] = useState<TCohort>(null);
  const router = useRouter();
  const { getAccessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchCohort(id as string).then((res) => {
        const { data } = res;
        data.program = data.program.id;
        setInitialData(data);
      });
    }
  }, [router.query, setInitialData]);

  const handleCohortUpdate = (cohort: TCohort) => {
    setIsLoading(true);
    const copy = { ...cohort, techs: cohort.techs.map((t: Tech) => t.id) };
    return updateCohort(copy, getAccessToken()).then(() => {
      router.push(`/cohorts/${cohort.id}`);
    }).finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <Layout title="Automator | Edit Cohort">
      <CohortForm
        title={`Edit ${initialData?.name}`}
        handleSubmit={handleCohortUpdate}
        cancelRoute={`/cohorts/${initialData?.id}`}
        initialData={initialData}
        isLoading={isLoading}
      />
    </Layout>
  );
}

export default EditCohort;
