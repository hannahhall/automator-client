import { Path, UseFormRegister } from 'react-hook-form';

interface CheckboxProps<TInputField> {
  name: Path<TInputField>;
  register: UseFormRegister<TInputField>;
  label: string | JSX.Element;
  onChangeEvent?: (event) => void;
  addlClass?: string;
  error?: string | undefined;
  value?: string | number | undefined;
}

const defaultProps = {
  addlClass: '',
  error: undefined,
  value: undefined,
  onChangeEvent: undefined,
};

function Checkbox<TInputField>({
  name, register, label, onChangeEvent, addlClass, error, value,
}: CheckboxProps<TInputField> & typeof defaultProps) {
  return (
    <div className={`field ${addlClass}`}>
      <div className="control">
        <label className="label is-flex" htmlFor={name}>
          <input id={name} type="checkbox" value={value} onChange={onChangeEvent} {...register(name)} />
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
