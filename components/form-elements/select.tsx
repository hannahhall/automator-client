import { Path, UseFormRegister } from 'react-hook-form';

interface SelectProps<TInputField> {
  name: Path<TInputField>;
  register: UseFormRegister<TInputField>;
  options: {
    id: number;
    name: string;
  }[]
  title: string;
  label: string;
  addlClass?: string;
  error?: string | undefined;
  isRequired: boolean;
}

const defaultProps = {
  addlClass: '',
  error: undefined,
};

function Select<TInputField>({
  name, register, options, title, label, addlClass, error, isRequired,
}: SelectProps<TInputField>) {
  return (
    <div className="field is-expanded">
      <label className={`label ${isRequired ? 'has-text-weight-bold' : 'has-text-weight-normal'}`} htmlFor={name}>{label}</label>
      <div className={`select ${addlClass} is-fullwidth`}>
        <select
          id={name}
          {...register(name, {
            required: isRequired ? 'This field is required' : isRequired,
          })}
        >
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
