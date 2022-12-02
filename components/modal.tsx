import { ReactNode } from 'react';

interface ModalProps {
  isActive: boolean;
  title: string;
  handleClose?: (event) => void | undefined;
  body: ReactNode;
  footer?: ReactNode | undefined;
}

const defaultProps = {
  footer: undefined,
  handleClose: undefined,
};

function Modal({
  isActive, handleClose, body, footer, title,
}: ModalProps) {
  return (
    <div
      className={`modal ${isActive ? 'is-active' : ''}`}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-body"
    >
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" id="modal-title">{title}</p>
          {
            handleClose && <button type="button" className="delete" aria-label="close" onClick={handleClose} />
          }
        </header>
        <section className="modal-card-body" id="modal-body">
          {body}
        </section>
        {
          footer
          && (
            <footer className="modal-card-foot">
              {footer}
            </footer>
          )
        }
      </div>
    </div>
  );
}

Modal.defaultProps = defaultProps;

export default Modal;
