interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  onChangeEvent: (event) => void;
  error?: string | undefined;
  isRequired: boolean;
}

const defaultProps = { error: undefined };

function Textarea({
  id, label, placeholder, onChangeEvent, error, isRequired,
}: TextareaProps) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <div className="control">
        <textarea id={id} name={id} className="textarea" placeholder={placeholder} onChange={onChangeEvent} required={isRequired} />
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

Textarea.defaultProps = defaultProps;

export default Textarea;
