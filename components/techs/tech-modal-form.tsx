import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTech, updateTech } from '../../data/tech';
import { useAuth } from '../../hooks/useAuth';
import { Tech } from '../../interfaces';
import { Input, FileInput } from '../form-elements';
import Modal from '../modal';
import TechIcon from './icon';

interface TechModalFormProps {
  showModal: boolean;
  closeModal: () => void;
  initialData?: Tech;
}

const defaultValues = {
  initialData: null,
};

function TechModalForm({ showModal, closeModal, initialData }: TechModalFormProps) {
  const {
    register, handleSubmit, reset, watch,
  } = useForm<Tech>();
  const { icon } = watch();

  const [errors, setErrors] = useState<Tech>(null);

  const { getAccessToken } = useAuth();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const saveTech = (tech: Tech) => {
    const copy = { ...tech, icon: tech.icon[0] };
    if (initialData) {
      updateTech(initialData.id, copy, getAccessToken()).then(() => {
        closeModal();
      }).catch((err) => {
        const { response } = err;
        setErrors(response.data);
      });
    } else {
      createTech(copy, getAccessToken()).then(() => {
        reset();
      }).catch((err) => {
        const { response } = err;
        setErrors(response.data);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(saveTech)}>
      <Modal
        isActive={showModal}
        title={initialData ? `Edit ${initialData.text}` : 'Create a Tech'}
        handleClose={closeModal}
        body={(
          <>
            <Input
              name="text"
              register={register}
              label="Tech Name"
              isRequired
              error={errors?.text}
            />

            <FileInput<Tech>
              name="icon"
              register={register}
              label="Tech Icon"
              filename={icon ? icon[0]?.name : undefined}
              error={errors?.icon as string}
            />

            {
              initialData.square_icon ? (
                <>
                  <TechIcon src={initialData.square_icon} text={initialData.text} />
                  <p className="help is-danger">This will edit across all programs using this tech</p>
                </>
              ) : null
            }
          </>
        )}
        footer={(
          <>
            <button type="submit" className="button is-success">Save Tech</button>
            <button type="button" className="button" onClick={closeModal}>Cancel</button>
          </>
        )}

      />
    </form>
  );
}

TechModalForm.defaultProps = defaultValues;
export default TechModalForm;
