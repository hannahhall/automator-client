import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import {
  SubmitErrorHandler, SubmitHandler, useForm, UseFormReturn,
} from 'react-hook-form';
import { ICohort, Tech } from '../../interfaces';

interface AppFormProps<TFormValues> {
  onSubmit: SubmitHandler<TFormValues>;
  setErrors: (object: TFormValues) => void;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
  title: string;
  cancelRoute: string;
}

type Values = string | number | (string | Tech | ICohort | number)[] | boolean | File;

function AppForm<TFormValues extends Record<string, Values>>({
  children, title, onSubmit, cancelRoute, setErrors,
}: AppFormProps<TFormValues>) {
  const methods = useForm<TFormValues>();
  const router = useRouter();

  const onError: SubmitErrorHandler<TFormValues> = (formErrors) => {
    const errorMessages = {};
    Object.entries(formErrors).forEach(([field, error]) => {
      errorMessages[field] = error.message;
    });
    setErrors(errorMessages as TFormValues);
  };

  const handleCancel = () => {
    router.push(cancelRoute);
  };

  const onSubmitCatch = (object: TFormValues) => {
    onSubmit(object).catch((err: AxiosError<TFormValues>) => {
      const { response } = err;
      setErrors(response.data);
    });
  };

  return (
    <article className="panel is-warning">
      <p role="heading" aria-level={2} className="panel-heading">
        {title}
      </p>
      <section className="panel-block p-6">
        <form onSubmit={methods.handleSubmit(onSubmitCatch, onError)} className="is-flex-grow-1" name={title}>
          {children(methods)}
          <div className="field is-grouped">
            <div className="control">
              <button type="submit" className="button is-primary">Submit</button>
            </div>
            <div className="control">
              <button type="button" onClick={handleCancel} className="button is-primary is-light">Cancel</button>
            </div>
          </div>
        </form>
      </section>
    </article>
  );
}

export default AppForm;
