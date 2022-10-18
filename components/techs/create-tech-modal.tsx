import { useState } from 'react';
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
  const [tech, setTech] = useState<Tech>({
    text: '',
    icon: '',
  });
  const { getAccessToken } = useAuth();

  const saveTech = (event) => {
    event.preventDefault();
    createTech(tech, getAccessToken()).then(() => {
      event.target.reset();
    });
  };

  return (
    <form onSubmit={saveTech}>
      <Modal
        isActive={showModal}
        title="Create a Tech"
        handleClose={closeModal}
        body={(
          <>
            <Input
              id="text"
              label="Tech Name"
              onChangeEvent={(e) => setTech({ ...tech, text: e.target.value })}
              isRequired
            />

            <FileInput
              id="icon"
              label="Tech Icon"
              onChangeEvent={(icon) => setTech({ ...tech, icon })}
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
