import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { createProgram } from '../../data/program';
import { useAuth } from '../../hooks/useAuth';
import { Program, Tech } from '../../interfaces';
import ProgramForm from '../../components/programs/form';

function CreateProgram() {
  const router = useRouter();
  const { getAccessToken } = useAuth();

  const handleProgramSubmit = (program: Program) => {
    const copy = { ...program, techs: program.techs.map((t: Tech) => t.id) };
    return createProgram(copy, getAccessToken()).then((response) => {
      const { data } = response;
      router.push(`/programs/${data.id}`);
    });
  };

  return (
    <Layout title="Automator | Create Program">
      <ProgramForm
        title="Create a Program"
        handleSubmit={handleProgramSubmit}
        cancelRoute="/"
      />
    </Layout>
  );
}

export default CreateProgram;
