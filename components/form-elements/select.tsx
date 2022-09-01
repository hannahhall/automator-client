interface SelectProps {
  id: string;
  options: {
    id: string;
    name: string;
  }[]
  title: string;
  label: string;
  addlClass?: string | undefined;
  onChangeEvent: (event) => void;
  error?: string | undefined;
  isRequired: boolean;
}

const defaultProps = {
  addlClass: undefined,
  error: undefined,
};

function Select({
  id, options, title, label, addlClass, onChangeEvent, error, isRequired,
}: SelectProps & typeof defaultProps) {
  return (
    <div className="field is-expanded">
      <label className="label" htmlFor={id}>{label}</label>
      <div className={`select ${addlClass} is-fullwidth`}>
        <select id={id} onChange={onChangeEvent} required={isRequired}>
          <option value="0">{title}</option>
          {
            options.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
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

Select.defaultProps = defaultProps;

export default Select;
