import { ReactNode } from 'react';

interface ModalProps {
  isActive: boolean;
  title: string;
  handleClose: (event) => void;
  body: ReactNode;
  footer: ReactNode
}

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
          <button type="button" className="delete" aria-label="close" onClick={handleClose} />
        </header>
        <section className="modal-card-body" id="modal-body">
          {body}
        </section>
        <footer className="modal-card-foot">
          {footer}
        </footer>
      </div>
    </div>
  );
}

export default Modal;
