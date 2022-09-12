interface CheckboxProps {
  id: string;
  label: string | undefined;
  onChangeEvent: (event) => void;
  addlClass?: string;
  error?: string | undefined;
}

const defaultProps = {
  addlClass: '',
  error: undefined,
};

function Checkbox({
  id, label, onChangeEvent, addlClass, error,
}: CheckboxProps & typeof defaultProps) {
  return (
    <div className={`field ${addlClass}`}>
      <label className="label" htmlFor={id}>
        {label}
        <input id={id} type="checkbox" onChange={onChangeEvent} />
      </label>

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

Checkbox.defaultProps = defaultProps;

export default Checkbox;
