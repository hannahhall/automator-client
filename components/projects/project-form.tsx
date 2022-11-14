import { useEffect } from 'react';
import { SubmitErrorHandler } from 'react-hook-form';
import { Project } from '../../interfaces';
import { AppForm, Input, Textarea } from '../form-elements';

interface ProjectFormProps {
  title: string;
  initialData?: Project | undefined,
  handleSubmit: (project: Project) => void;
  handleCancel: () => void;
  errors: Project;
  setErrors: (project: Project) => void;
}

const defaultProps = {
  initialData: undefined,
};

function ProjectForm({
  title, initialData, handleSubmit, handleCancel, errors, setErrors,
}: ProjectFormProps) {
  const onError: SubmitErrorHandler<Project> = (formErrors) => {
    const errorMessages = {};
    Object.entries(formErrors).forEach(([field, error]) => {
      errorMessages[field] = error.message;
    });
    setErrors(errorMessages as Project);
  };

  return (
    <AppForm<Project>
      title={title}
      onSubmit={handleSubmit}
      onError={onError}
      onCancel={handleCancel}
    >
      {({ register, reset, watch }) => {
        useEffect(() => {
          reset(initialData);
        }, [initialData, reset]);
        const { description } = watch();

        useEffect(() => {
          const length = description?.length || 0;
          setErrors({ ...errors, description: `${255 - length} characters remaining` });
        }, [description]);

        return (
          <>
            <Input
              name="title"
              register={register}
              label="Project Title"
              error={errors?.title}
              isRequired
            />

            <Input
              name="github_url"
              register={register}
              label="Github Url"
              error={errors?.github_url}
              isRequired
            />

            <Input
              name="deployed_url"
              register={register}
              label="Deployed Url"
              error={errors?.deployed_url}
              isRequired={false}
            />

            <Textarea
              name="description"
              register={register}
              label="Project Description"
              error={errors?.description}
              placeholder="Brief summary of your project and what techs you used"
              maxLength={255}
              isRequired
            />
          </>
        );
      }}
    </AppForm>
  );
}

ProjectForm.defaultProps = defaultProps;
export default ProjectForm;
