import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { fetchProgram, updateProgram } from '../../../data/program';
import { useAuth } from '../../../hooks/useAuth';
import { Program, Tech } from '../../../interfaces';
import ProgramForm from '../../../components/programs/form';

function EditProgram() {
  const [initialData, setInitialData] = useState<Program>(null);
  const router = useRouter();
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchProgram(id as string).then((res) => {
        const { data } = res;
        setInitialData(data);
      });
    }
  }, [router.query, setInitialData]);

  const handleProgramUpdate = (program: Program) => {
    const copy = { ...program, techs: program.techs.map((t: Tech) => t.id) };
    return updateProgram(copy, getAccessToken()).then(() => {
      router.push(`/programs/${program.id}`);
    });
  };

  return (
    <Layout title="Automator | Edit Program">
      <ProgramForm
        title={`Edit ${initialData?.name}`}
        handleSubmit={handleProgramUpdate}
        cancelRoute={`/programs/${initialData?.id}`}
        initialData={initialData}
      />
    </Layout>
  );
}

export default EditProgram;
