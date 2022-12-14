import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchPrograms, fetchProgram } from '../../data/program';
import { fetchTechs } from '../../data/tech';
import { useAuth } from '../../hooks/useAuth';
import {
  Program, TCohort, TCohortErrors, Tech,
} from '../../interfaces';
import {
  AppForm, Checkbox, Input, Select,
} from '../form-elements';
import TechModalForm from '../techs/tech-modal-form';
import TechMultiSelect from '../techs/tech-multiselect';
import GithubModal from './github_modal';
import LoadingModal from './loading-modal';

interface CohortFormProps {
  title: string;
  initialData?: TCohort | undefined,
  handleSubmit: (cohort: TCohort) => void;
  cancelRoute: string;
  isLoading: boolean;
}

const defaultProps = {
  initialData: undefined,
};

function CohortForm({
  title, initialData, handleSubmit, cancelRoute, isLoading,
}: CohortFormProps) {
  const [availableTechs, setTechs] = useState<Tech[]>([]);
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>([]);
  const [errors, setErrors] = useState<TCohortErrors>(null);
  const [showGithubModal, setShowGithubModal] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const { getGithubAccessToken, setRedirectTo } = useAuth();

  const router = useRouter();

  const getTechs = () => {
    fetchTechs().then((res) => {
      setTechs(res.data);
    });
  };

  useEffect(() => {
    const githubToken = getGithubAccessToken();
    if (!githubToken) {
      setRedirectTo(router.asPath);
      setShowGithubModal(true);
    }

    getTechs();
    fetchPrograms().then((res) => {
      setAvailablePrograms(res.data);
    });
  }, [router.asPath]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    getTechs();
  };

  const closeGithubModal = () => {
    router.push('/');
  };

  if (!availableTechs.length) {
    return <div>Is Loading</div>;
  }

  return (
    <>
      <AppForm<TCohort>
        title={title}
        onSubmit={handleSubmit}
        cancelRoute={cancelRoute}
        setErrors={setErrors}
      >
        {({
          register, reset, control, watch, setValue,
        }) => {
          useEffect(() => {
            reset(initialData);
          }, [initialData, reset]);

          const { program } = watch();

          useEffect(() => {
            if (!initialData) {
              if (program && program !== '0') {
                fetchProgram(program).then((res) => {
                  setValue('techs', res.data.techs);
                });
              }
            }
          }, [program]);

          return (
            <>
              <Input
                name="name"
                register={register}
                label="Cohort Name"
                error={errors?.name}
                isRequired
              />

              <Select
                name="program"
                register={register}
                label="Select Program"
                title="Choose program before adding techs"
                options={availablePrograms}
                error={errors?.program as string}
                isRequired
              />

              <div className="field">
                <TechMultiSelect
                  control={control}
                  availableTechs={availableTechs}
                />
                <button className="button is-info" type="button" onClick={openModal}>Add a new Tech</button>
              </div>

              <Input
                name="slack_channel"
                register={register}
                label="Slack Channel"
                error={errors?.slack_channel}
                isRequired
              />

              <Input
                name="github_organization"
                register={register}
                label="Github Organization"
                error={errors?.github_organization}
                isRequired
              />

              <div className="field">
                <p className="label has-text-weight-normal">Demo Date and RSVP link</p>
                <div className="field-body">
                  <Input
                    name="demo_day"
                    type="date"
                    placeholder="Date of Demo day"
                    register={register}
                    error={errors?.demo_day}
                    isRequired={false}
                  />

                  <Input
                    name="demo_day_link"
                    placeholder="Link to RSVP"
                    register={register}
                    error={errors?.demo_day_link}
                    isRequired={false}
                  />
                </div>
              </div>

              <Checkbox
                name="is_deployed"
                register={register}
                label="Deploy Website?"
              />
            </>
          );
        }}
      </AppForm>

      {
        showModal ? <TechModalForm showModal={showModal} closeModal={closeModal} /> : null
      }

      {
        showGithubModal
          ? (
            <GithubModal showModal={showGithubModal} closeModal={closeGithubModal} />
          ) : null
      }

      {
        isLoading || errors?.message
          ? (
            <LoadingModal showModal={isLoading || Boolean(errors?.message)} error={errors} />
          ) : null
      }
    </>
  );
}

CohortForm.defaultProps = defaultProps;
export default CohortForm;
