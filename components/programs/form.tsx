import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Multiselect from 'multiselect-react-dropdown';
import { fetchTechs } from '../../data/tech';
import { Program, Tech } from '../../interfaces';
import { AppForm, Input, Checkbox } from '../form-elements';
import TechModalForm from '../techs/tech-modal-form';
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
                isRequired
              />

              <div className="field">

                <Controller
                  control={control}
                  name="techs"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <p className="label">Choose existing techs</p>
                      <Multiselect
                        options={availableTechs}
                        placeholder="Search Techs"
                        displayValue="text"
                        closeOnSelect={false}
                        onSelect={onChange}
                        onRemove={onChange}
                        selectedValues={value}
                        avoidHighlightFirstOption
                        isObject
                      />
                    </>
                  )}
                />
              </div>
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
