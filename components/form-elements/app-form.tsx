import { ReactNode } from 'react';

interface AppFormProps {
  children: ReactNode;
  title: string;
  onSubmit: (event) => void;
  onCancel: (event) => void;
}

function AppForm({
  children, title, onSubmit, onCancel,
}: AppFormProps) {
  return (
    <article className="panel is-warning">
      <p className="panel-heading">
        {title}
      </p>
      <section className="panel-block ">
        <form onSubmit={onSubmit} className="is-flex-grow-1">
          {children}

          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">Submit</button>
            </div>
            <div className="control">
              <button type="button" onClick={onCancel} className="button is-primary is-light">Cancel</button>
            </div>
          </div>
        </form>
      </section>
    </article>
  );
}

export default AppForm;
