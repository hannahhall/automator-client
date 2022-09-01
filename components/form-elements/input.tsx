import { ReactNode } from 'react';

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string | undefined;
  label?: string | undefined;
  onChangeEvent: (event) => void;
  addlClass?: string | undefined;
  children?: ReactNode | undefined;
  error?: string | undefined;
  isRequired: boolean;
}

const defaultProps = {
  type: 'text',
  placeholder: undefined,
  label: undefined,
  addlClass: undefined,
  children: undefined,
  error: undefined,
};

function Input({
  id, type, placeholder, label, onChangeEvent, addlClass, children, error, isRequired,
}: InputProps & typeof defaultProps) {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="label" htmlFor={id}>{label}</label>}
      <div className="control is-expanded">
        <input
          id={id}
          placeholder={placeholder}
          className="input"
          type={type}
          onChange={onChangeEvent}
          required={isRequired}
        />
      </div>
      {
        error ? (
          <p className="help is-danger">
            {error}
          </p>
        ) : null
      }
      {children}
    </div>
  );
}

Input.defaultProps = defaultProps;

export default Input;
