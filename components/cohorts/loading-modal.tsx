import Modal from '../modal';

interface LoadingModalProps {
  showModal: boolean;
  error: {
    id: number,
    message?: string
  }
}

function LoadingModal({ showModal, error }: LoadingModalProps) {
  return (
    <Modal
      isActive={showModal}
      body={
        error?.id
          ? (
            <div>
              <p className="has-text-danger">{error.message}</p>
              <a className="button is-warning" href={`/cohorts/${error?.id}`}>Go to Cohort</a>
            </div>
          ) : <progress className="progress is-small is-primary" max="100">15%</progress>
      }
      title="Creating github repo..."
    />
  );
}

export default LoadingModal;
