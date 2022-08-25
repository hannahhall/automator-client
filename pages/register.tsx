import { FormEvent, useEffect, useState } from 'react';
import { Select } from '../components/form-elements';
import Layout from '../components/Layout';
import { fetchCohorts } from '../data/cohort';
import { ICohort } from '../interfaces';

function Register() {
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetchCohorts().then((res) => {
      setCohorts(res.data);
    });
  }, []);

  return (
    <Layout title="Register an account">
      <form onSubmit={handleSubmit}>
        <Select options={cohorts} label="Choose your Cohort" title="Cohort Name" id="cohort-select" />
      </form>
    </Layout>
  );
}

export default Register;
