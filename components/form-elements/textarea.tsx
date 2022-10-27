import { Path, UseFormRegister } from 'react-hook-form';

interface TextareaProps<TInputField> {
  name: Path<TInputField>;
  register: UseFormRegister<TInputField>;
  label: string;
  placeholder: string;
  error?: string | undefined;
  isRequired: boolean;
}

const defaultProps = { error: undefined };

function Textarea<TInputField>({
  name, register, label, placeholder, error, isRequired,
}: TextareaProps<TInputField>) {
  return (
    <div className="field">
      <label className="label" htmlFor={name}>{label}</label>
      <div className="control">
        <textarea
          id={name}
          className="textarea"
          placeholder={placeholder}
          {...register(name, {
            required: isRequired,
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
