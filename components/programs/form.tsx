import { useState, useEffect } from 'react';
import { fetchTechs } from '../../data/tech';
import { Program, Tech } from '../../interfaces';
import { AppForm, Input, Checkbox } from '../form-elements';
import CreateTechModal from '../techs/create-tech-modal';
import TechIcon from '../techs/icon';

interface ProgramFormProps {
  title: string;
  initialData?: Program | undefined,
  handleSubmit: (program: Program) => void;
  handleCancel: () => void;
}

const defaultProps = {
  initialData: undefined,
};

function ProgramForm({
  title, initialData, handleSubmit, handleCancel,
}: ProgramFormProps) {
  const [availableTechs, setTechs] = useState<Tech[]>([]);

  const [showModal, setShowModal] = useState(false);

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

  if (!availableTechs.length) {
    return <div>Is Loading</div>;
  }

  return (
    <>
      <AppForm<Program> title={title} onSubmit={handleSubmit} onCancel={handleCancel}>
        {({ register, reset }) => {
          useEffect(() => {
            reset(initialData);
          }, [initialData, reset]);

          return (
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
          );
        }}
      </AppForm>
      {
        showModal ? <CreateTechModal showModal={showModal} closeModal={closeModal} /> : null
      }
    </>
  );
}

ProgramForm.defaultProps = defaultProps;
export default ProgramForm;
