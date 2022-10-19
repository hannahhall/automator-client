import { useRouter } from 'next/router';
import {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
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
  const [program, setProgram] = useState<Program>({
    name: '',
    techs: [],
  });
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

  const handleProgramSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProgram(program, getAccessToken()).then((response) => {
      const { data } = response;
      router.push(`/programs/${data.id}`);
    });
  };

  const handleProgramCancel = (): void => {
    router.push('/');
  };

  const updateSelectedTechs = (event: ChangeEvent<HTMLInputElement>) => {
    const { techs } = program;
    const techId = parseInt(event.target.value);
    if (techs.includes(techId)) {
      const index = techs.indexOf(techId);
      techs.splice(index, 1);
    } else {
      techs.push(techId);
    }
    setProgram({ ...program, techs });
  };

  if (!availableTechs.length) {
    return <div>Is Loading</div>;
  }

  return (
    <Layout title="Automator | Create Program">
      <AppForm title="Create a Program" onSubmit={handleProgramSubmit} onCancel={handleProgramCancel}>
        <>
          <Input
            id="name"
            label="Program Name"
            onChangeEvent={(event) => setProgram({ ...program, name: event.target.value })}
            isRequired
          />

          {
            availableTechs.map((tech) => (
              <Checkbox
                id={tech.text}
                key={tech.id}
                label={<TechIcon src={tech.square_icon} text={tech.text} />}
                value={tech.id}
                onChangeEvent={updateSelectedTechs}
              />
            ))
          }
          <div className="field">
            <button className="button is-info" type="button" onClick={openModal}>Add a new Tech</button>
          </div>
        </>
      </AppForm>
      <CreateTechModal showModal={showModal} closeModal={closeModal} />
    </Layout>
  );
}

export default CreateProgram;
