import { ReactNode } from 'react';

interface InputProps {
  id: string;
  type?: string;
  placeholder?: string | undefined;
  refEl?: HTMLInputElement | undefined;
  label?: string | undefined;
  onChangeEvent: (event) => void;
  addlClass?: string | undefined;
  children?: ReactNode | undefined;
}

const defaultProps = {
  type: 'text',
  placeholder: undefined,
  refEl: undefined,
  label: undefined,
  addlClass: undefined,
  children: undefined,
};

function Input({
  id, type, placeholder, refEl, label, onChangeEvent, addlClass, children,
}: InputProps & typeof defaultProps) {
  return (
    <div className={`field ${addlClass}`}>
      {label && <label className="label" htmlFor={id}>{label}</label>}
      <div className="control">
        <input
          id={id}
          placeholder={placeholder}
          className="input"
          type={type}
          ref={refEl}
          onChange={onChangeEvent}
        />
      </div>
      {children}
    </div>
  );
}

Input.defaultProps = defaultProps;

export default Input;
