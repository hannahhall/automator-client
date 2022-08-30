interface SelectProps {
  id: string;
  refEl?: HTMLSelectElement | undefined;
  options: {
    id: string;
    name: string;
  }[]
  title: string;
  label: string;
  addlClass?: string | undefined;
  onChangeEvent: (event) => void;
  error?: string | undefined;
}

const defaultProps = {
  refEl: undefined,
  addlClass: undefined,
  error: undefined,
};

function Select({
  id, refEl, options, title, label, addlClass, onChangeEvent, error,
}: SelectProps & typeof defaultProps) {
  return (
    <div className="field is-expanded">
      <label className="label" htmlFor={id}>{label}</label>
      <div className={`select ${addlClass} is-fullwidth`}>
        <select id={id} ref={refEl} onChange={onChangeEvent}>
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
