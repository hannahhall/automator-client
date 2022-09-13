interface InputProps {
  id: string;
  type?: string;
  placeholder?: string | undefined;
  label?: string | undefined;
  onChangeEvent: (event) => void;
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

function Input({
  id, type, placeholder, label, onChangeEvent, addlClass, error, isRequired,
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
