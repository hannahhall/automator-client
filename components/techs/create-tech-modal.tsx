import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTech } from '../../data/tech';
import { useAuth } from '../../hooks/useAuth';
import { Tech } from '../../interfaces';
import { Input, FileInput } from '../form-elements';
import Modal from '../modal';

interface CreateTechModalProps {
  showModal: boolean;
  closeModal: () => void;
}
function CreateTechModal({ showModal, closeModal }: CreateTechModalProps) {
  const {
    register, handleSubmit, reset, watch,
  } = useForm<Tech>();
  const { icon } = watch();

  const [errors, setErrors] = useState<Tech>(null);

  const { getAccessToken } = useAuth();

  const saveTech = (tech: Tech) => {
    const copy = { ...tech, icon: tech.icon[0] };
    createTech(copy, getAccessToken()).then(() => {
      reset();
    }).catch((err) => {
      const { response } = err;
      setErrors(response.data);
    });
  };

  return (
    <form onSubmit={handleSubmit(saveTech)}>
      <Modal
        isActive={showModal}
        title="Create a Tech"
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

export default CreateTechModal;
