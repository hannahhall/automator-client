interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  onChangeEvent: (event) => void;
  error?: string | undefined;
}

const defaultProps = { error: undefined };

function Textarea({
  id, label, placeholder, onChangeEvent, error,
}: TextareaProps) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <div className="control">
        <textarea id={id} className="textarea" placeholder={placeholder} onChange={onChangeEvent} />
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
