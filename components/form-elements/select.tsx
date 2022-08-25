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
}

const defaultProps = {
  refEl: undefined,
  addlClass: undefined,
};

function Select({
  id, refEl, options, title, label, addlClass = '',
}: SelectProps & typeof defaultProps) {
  return (
    <div className="field is-expanded">
      <label className="label" htmlFor={id}>{label}</label>
      <div className={`select ${addlClass} is-fullwidth`}>
        <select id={id} ref={refEl}>
          <option value="0">{title}</option>
          {
            options.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
      </div>
    </div>
  );
}

Select.defaultProps = defaultProps;

export default Select;
