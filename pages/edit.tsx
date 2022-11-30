import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
  AppForm, Input, Select, Textarea, FileInput,
} from '../components/form-elements';
import Layout from '../components/layout';
import { fetchStudent, updateStudent } from '../data/auth';
import { fetchCohorts } from '../data/cohort';
import { useAuth } from '../hooks/useAuth';
import { TCohort, TStudentForm } from '../interfaces';

function EditStudent() {
  const [cohorts, setCohorts] = useState<TCohort[]>([]);
  const [initialData, setInitialData] = useState<TStudentForm>(null);
  const [errors, setErrors] = useState<TStudentForm>(null);
  const router = useRouter();

  const { getAccessToken } = useAuth();

  const handleSubmit = (student: TStudentForm) => {
    const copy = {
      ...student,
      image: student.image[0],
    };
    return updateStudent(copy, getAccessToken()).then(() => {
      router.push('/');
    });
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchStudent(token, false).then((res) => {
        const { data } = res;
        setInitialData(data);
      });
    }
  }, [getAccessToken()]);

  useEffect(() => {
    fetchCohorts().then((res) => {
      setCohorts(res.data);
    });
  }, []);
  return (
    <Layout title="Automator | Edit My Info">
      <AppForm<TStudentForm>
        title="Edit My Info"
        onSubmit={handleSubmit}
        cancelRoute="/"
        setErrors={setErrors}
      >
        {({ register, watch, reset }) => {
          useEffect(() => {
            reset(initialData);
          }, [initialData, reset]);

          const { image } = watch();
          return (
            <>
              <Input
                register={register}
                name="user.email"
                label="Email"
                type="email"
                error={errors?.user?.email}
                isRequired
              />

              <Input
                register={register}
                name="user.first_name"
                label="First Name"
                error={errors?.user?.first_name}
                isRequired
              />

              <Input
                register={register}
                name="user.last_name"
                label="Last Name"
                error={errors?.user?.last_name}
                isRequired
              />

              <Select
                name="cohort"
                register={register}
                label="Select your Cohort"
                title="Cohort #"
                options={cohorts}
                error={errors?.cohort as string}
                isRequired
              />

              <Input
                register={register}
                name="github_handle"
                label="Github Username"
                error={errors?.github_handle}
                isRequired
              />

              <Input
                register={register}
                name="linkedin"
                label="Linkedin Username"
                error={errors?.linkedin}
                isRequired={false}
              />

              <Input
                register={register}
                name="resume_link"
                label="Resume Link"
                error={errors?.resume_link}
                isRequired={false}
              />

              <Input
                register={register}
                name="podcast_link"
                label="Podcast Link"
                error={errors?.podcast_link}
                isRequired={false}
              />

              <Input
                register={register}
                name="favorite_quote"
                label="Favorite Quote"
                error={errors?.favorite_quote}
                isRequired={false}
              />

              <Textarea
                name="bio"
                register={register}
                label="Bio"
                placeholder="Write a short paragraph about yourself"
                error={errors?.bio}
                isRequired={false}
                maxLength={500}
              />

              <FileInput
                name="image"
                register={register}
                label="Upload a profile image"
                filename={image ? image[0]?.name : undefined}
                error={errors?.image as string}
              />
            </>
          );
        }}
      </AppForm>
    </Layout>
  );
}

export default EditStudent;
