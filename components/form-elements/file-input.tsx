import { useState } from 'react';

interface InputProps {
  id: string;
  label: string | undefined;
  onChangeEvent: (imageString: string) => void;
}

function FileInput({
  id, label, onChangeEvent,
}: InputProps) {
  const [file, setFile] = useState<File>(null);
  const getBase64 = (blob: Blob, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(blob);
  };

  const createImageString = (event) => {
    setFile(event.target.files[0]);
    getBase64(event.target.files[0], (base64ImageString: string) => {
      onChangeEvent(base64ImageString);
    });
  };

  return (
    <div className="field">
      <div className="file has-name">
        <label className="file-label" htmlFor={id}>
          <input className="file-input" type="file" id={id} onChange={createImageString} />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload" />
            </span>
            <span className="file-label">
              {label}
            </span>
          </span>
          <span className="file-name">
            {file ? file.name : 'Please upload a file'}
          </span>
        </label>
      </div>
    </div>
  );
}

export default FileInput;
