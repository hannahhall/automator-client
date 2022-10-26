import { useRouter } from 'next/router';
import {
  useEffect,
  useState,
} from 'react';
import { Checkbox, Input, AppForm } from '../../components/form-elements';
import Layout from '../../components/layout';
import CreateTechModal from '../../components/techs/create-tech-modal';
import TechIcon from '../../components/techs/icon';
import { createProgram } from '../../data/program';
import { fetchTechs } from '../../data/tech';
import { useAuth } from '../../hooks/useAuth';
import { Tech, Program } from '../../interfaces';

function CreateProgram() {
  const [availableTechs, setTechs] = useState<Tech[]>([]);

  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const { getAccessToken } = useAuth();

  const getTechs = () => {
    fetchTechs().then((res) => {
      setTechs(res.data);
    });
  };

  useEffect(() => {
    getTechs();
  }, []);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    getTechs();
  };

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

  if (!availableTechs.length) {
    return <div>Is Loading</div>;
  }

  return (
    <Layout title="Automator | Create Program">
      <AppForm<Program> title="Create a Program" onSubmit={handleProgramSubmit} onCancel={handleProgramCancel}>
        {({ register }) => (
          <>
            <Input
              name="name"
              register={register}
              label="Program Name"
              isRequired
            />

            {
              availableTechs.map((tech, index) => (
                <Checkbox
                  name={`techs.${index}`}
                  register={register}
                  key={tech.id}
                  label={<TechIcon src={tech.square_icon} text={tech.text} />}
                  value={tech.id}
                />
              ))
            }
            <div className="field">
              <button className="button is-info" type="button" onClick={openModal}>Add a new Tech</button>
            </div>
          </>
        )}
      </AppForm>
      {
        showModal ? <CreateTechModal showModal={showModal} closeModal={closeModal} /> : null
      }
    </Layout>
  );
}

export default CreateProgram;
