import { useState, useEffect } from 'react';
import { fetchTechs } from '../../data/tech';
import { Program, Tech } from '../../interfaces';
import { AppForm, Input } from '../form-elements';
import TechModalForm from '../techs/tech-modal-form';
import TechMultiSelect from '../techs/tech-multiselect';

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
  const [errors, setErrors] = useState<Program>(null);

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
      <AppForm<Program>
        title={title}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        setErrors={setErrors}
      >
        {({ register, reset, control }) => {
          useEffect(() => {
            reset(initialData);
          }, [initialData, reset]);

          return (
            <>
              <Input
                name="name"
                register={register}
                label="Program Name"
                error={errors?.name}
                isRequired
              />

              <TechMultiSelect control={control} availableTechs={availableTechs} />

              <div className="field">
                <button className="button is-info" type="button" onClick={openModal}>Add a new Tech</button>
              </div>
            </>
          );
        }}
      </AppForm>
      {
        showModal ? <TechModalForm showModal={showModal} closeModal={closeModal} /> : null
      }
    </>
  );
}

ProgramForm.defaultProps = defaultProps;
export default ProgramForm;
