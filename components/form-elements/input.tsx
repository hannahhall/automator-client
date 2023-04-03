import { ReactNode } from 'react';
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
  addOns?: ReactNode | undefined;
}

const defaultProps = {
  type: 'text',
  placeholder: undefined,
  label: undefined,
  addlClass: '',
  error: undefined,
  addOns: false,
};

function Input<TInputField>({
  name, register, type, placeholder, label, addlClass, error, isRequired, addOns,
}: InputProps<TInputField>) {
  return (
    <>
      {label && (
        <label className={`label ${isRequired ? 'has-text-weight-bold' : 'has-text-weight-normal'}`} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={`field ${addlClass}`}>
        {addOns && addOns}
        <div className="control is-expanded">
          <input
            id={name}
            {...register(name, {
              required: isRequired ? 'This field is required' : isRequired,
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
    </>
  );
}

Input.defaultProps = defaultProps;

export default Input;
