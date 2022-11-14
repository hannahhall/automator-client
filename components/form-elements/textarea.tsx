import { Path, UseFormRegister } from 'react-hook-form';

interface TextareaProps<TInputField> {
  name: Path<TInputField>;
  register: UseFormRegister<TInputField>;
  label: string;
  placeholder: string;
  error?: string | undefined;
  isRequired: boolean;
  maxLength?: number;
}

const defaultProps = {
  error: undefined,
  maxLength: 500,
};

function Textarea<TInputField>({
  name, register, label, placeholder, error, isRequired, maxLength,
}: TextareaProps<TInputField>) {
  return (
    <div className="field">
      <label className={`label ${isRequired ? 'has-text-weight-bold' : 'has-text-weight-normal'}`} htmlFor={name}>{label}</label>
      <div className="control">
        <textarea
          id={name}
          className="textarea"
          placeholder={placeholder}
          {...register(name, {
            required: isRequired ? 'This field is required' : isRequired,
            maxLength: {
              value: maxLength,
              message: 'This field is too long to be saved. Please update your input',
            },
          })}
        />
      </div>
      {
        error ? (
          <p className="help is-danger">
            {error}
          </p>
        ) : null
      }
    </div>
  );
}

Textarea.defaultProps = defaultProps;

export default Textarea;
