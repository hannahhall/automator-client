import { Path, UseFormRegister } from 'react-hook-form';

interface InputProps<TInputField> {
  name: Path<TInputField>;
  register: UseFormRegister<TInputField>;
  type?: string;
  placeholder?: string | undefined;
  label?: string | undefined;
  addlClass?: string;
  error?: string | undefined;
  isRequired: boolean;
}

const defaultProps = {
  type: 'text',
  placeholder: undefined,
  label: undefined,
  addlClass: '',
  error: undefined,
};

function Input<TInputField>({
  name, register, type, placeholder, label, addlClass, error, isRequired,
}: InputProps<TInputField>) {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="label" htmlFor={name}>{label}</label>}
      <div className="control is-expanded">
        <input
          id={name}
          {...register(name, {
            required: isRequired,
          })}
          placeholder={placeholder}
          className="input"
          type={type}
        />
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

Input.defaultProps = defaultProps;

export default Input;
