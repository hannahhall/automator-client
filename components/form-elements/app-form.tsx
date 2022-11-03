import { ReactNode } from 'react';
import { SubmitHandler, useForm, UseFormReturn } from 'react-hook-form';
import { ICohort, Tech } from '../../interfaces';

interface AppFormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  title: string;
  onCancel: () => void;
}

type Values = string | number | (string | Tech | ICohort | number)[] | boolean | File

function AppForm<TFormValues extends Record<string, Values>>({
  children, title, onSubmit, onCancel,
}: AppFormProps<TFormValues>) {
  const methods = useForm<TFormValues>();
  return (
    <article className="panel is-warning">
      <p role="heading" aria-level={2} className="panel-heading">
        {title}
      </p>
      <section className="panel-block p-6">
        <form onSubmit={methods.handleSubmit(onSubmit)} className="is-flex-grow-1" name={title}>
          {children(methods)}
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
