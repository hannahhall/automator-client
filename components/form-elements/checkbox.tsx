interface CheckboxProps {
  id: string;
  label: string | JSX.Element;
  onChangeEvent: (event) => void;
  addlClass?: string;
  error?: string | undefined;
  value?: string | number | undefined;
}

const defaultProps = {
  addlClass: '',
  error: undefined,
  value: undefined,
};

function Checkbox({
  id, label, onChangeEvent, addlClass, error, value,
}: CheckboxProps & typeof defaultProps) {
  return (
    <div className={`field ${addlClass}`}>
      <div className="control">
        <label className="label is-flex" htmlFor={id}>
          <input id={id} name={id} type="checkbox" onChange={onChangeEvent} value={value} />
          {label}
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

Checkbox.defaultProps = defaultProps;

export default Checkbox;
