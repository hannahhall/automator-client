import Modal from '../modal';

interface GithubModalProps {
  showModal: boolean;
  closeModal: () => void;
}

function GithubModal({ showModal, closeModal }: GithubModalProps) {
  return (
    <Modal
      isActive={showModal}
      title="Authenticate with Github?"
      handleClose={closeModal}
      body={(
        <a className="button is-warning" href={`https://github.com/login/oauth/authorize?scope=user:email,repo_deployment,repo,admin_org&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}>Go to Github</a>
      )}
    />
  );
}

export default GithubModal;
