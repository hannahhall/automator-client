interface TextareaProps {
  id: string;
  label: string;
  placeholder: string;
  refEl?: HTMLTextAreaElement | undefined;
}

const defaultProps = {
  refEl: undefined,
};

function Textarea({
  id, label, placeholder, refEl,
}: TextareaProps & typeof defaultProps) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}</label>
      <div className="control">
        <textarea id={id} className="textarea" placeholder={placeholder} ref={refEl} />
      </div>
    </div>
  );
}

Textarea.defaultProps = defaultProps;

export default Textarea;
