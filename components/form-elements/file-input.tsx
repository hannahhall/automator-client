import { ChangeEvent, useState } from 'react';

interface InputProps {
  id: string;
  label: string | undefined;
  onChangeEvent: (image: File) => void;
  error: string | undefined;
}

function FileInput({
  id, label, onChangeEvent, error,
}: InputProps) {
  const [file, setFile] = useState<File>(null);

  const createImageString = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files[0]);
    onChangeEvent(event.target.files[0]);
  };

  return (
    <div className="field">
      <div className="file has-name">
        <label className="file-label" htmlFor={id}>
          <input className="file-input" type="file" id={id} name={id} onChange={createImageString} data-testid="file-input" />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload" />
            </span>
            <span className="file-label">
              {label}
            </span>
          </span>
          <span className="file-name">
            {file ? file.name : 'File should be .jpg or .png'}
          </span>
        </label>
      </div>
      {
        error ? (
          <p className="help is-danger" data-testid="error-message">
            {error}
          </p>
        ) : null
      }
    </div>
  );
}

export default FileInput;
