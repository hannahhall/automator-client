import Modal from './modal';

interface DeleteModalProps {
  name: string;
  handleSubmit: () => void;
  handleCancel: () => void;
  isActive: boolean;
}

function DeleteModal({
  name, handleSubmit, handleCancel, isActive,
}: DeleteModalProps) {
  return (
    <Modal
      isActive={isActive}
      title={`Delete ${name}?`}
      handleClose={handleCancel}
      body={(
        <p>
          Are you sure you want to delete&nbsp;
          {name}
          ?
        </p>
      )}
      footer={(
        <>
          <button type="button" className="button is-success" onClick={handleSubmit}>
            Delete&nbsp;
            {name}
          </button>
          <button type="button" className="button" onClick={handleCancel}>Cancel</button>
        </>
      )}
    />
  );
}

export default DeleteModal;
