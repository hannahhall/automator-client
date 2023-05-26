import { Path, UseFormRegister } from 'react-hook-form';

interface InputProps<TInputField> {
  name: Path<TInputField>;
  register: UseFormRegister<TInputField>;
  label: string | undefined;
  error: string | undefined;
  filename: string | undefined
}

function FileInput<TInputField>({
  name, register, label, error, filename,
}: InputProps<TInputField>) {
  return (
    <div className="field">
      <div className="file has-name">
        <label className="file-label" htmlFor={name}>
          <input
            id="file-input"
            className="file-input"
            type="file"
            {...register(name, {
              // eslint-disable-next-line consistent-return
              validate: (value) => {
                if (value[0]) {
                  const file = value[0];
                  const validTypes = ['image/jpeg', 'image/png'];
                  if (!validTypes.includes(file.type)) {
                    return 'File type not permitted';
                  }
                  if (file.size > 10485760) {
                    return 'File size must be less than 10MB';
                  }
                }
              },
            })}
            data-testid="file-input"
          />
          <button type="button" className="file-cta" onClick={() => document.getElementById('file-input').click()}>
            <span className="file-icon">
              <i className="fas fa-upload" />
            </span>
            <span className="file-label">
              {label}
            </span>
          </button>
          <span className="file-name">
            {filename || 'File should be .jpg or .png'}
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
