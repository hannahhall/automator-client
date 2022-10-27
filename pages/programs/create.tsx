import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { createProgram } from '../../data/program';
import { useAuth } from '../../hooks/useAuth';
import { Program } from '../../interfaces';
import ProductForm from '../../components/programs/form';

function CreateProgram() {
  const router = useRouter();
  const { getAccessToken } = useAuth();

  const handleProgramSubmit = (program: Program) => {
    const copy = { ...program, techs: program.techs.filter((t) => t) };
    createProgram(copy, getAccessToken()).then((response) => {
      const { data } = response;
      router.push(`/programs/${data.id}`);
    });
  };

  const handleProgramCancel = () => {
    router.push('/');
  };

  return (
    <Layout title="Automator | Create Program">
      <ProductForm
        title="Create a Program"
        handleSubmit={handleProgramSubmit}
        handleCancel={handleProgramCancel}
      />
    </Layout>
  );
}

export default CreateProgram;
