import {
  useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  Checkbox, Input, Select, Textarea, FileInput,
} from '../components/form-elements';
import { fetchCohorts } from '../data/cohort';
import { ICohort, TUserForm } from '../interfaces';

import Layout from '../components/layout';
import AppForm from '../components/form-elements/app-form';
import { registerUser } from '../data/auth';
import { useAuth } from '../hooks/useAuth';

function Register() {
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [errors, setErrors] = useState<TUserForm>(null);
  const router = useRouter();

  const { setAccessToken, setRefreshToken } = useAuth();

  const handleSubmit = (user: TUserForm) => {
    const copy = {
      ...user,
      image: user.image[0],
      is_staff: user.is_staff ? 1 : 0,
    };
    registerUser(copy).then((res) => {
      const { data } = res;
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      router.push('/');
    }).catch((err) => {
      const { response } = err;
      setErrors(response.data);
    });
  };

  const handleCancel = () => {
    router.push('/login');
  };

  useEffect(() => {
    fetchCohorts().then((res) => {
      setCohorts(res.data);
    });
  }, []);

  return (
    <Layout title="Automator | Register">
      <AppForm<TUserForm> title="Register" onSubmit={handleSubmit} onCancel={handleCancel}>
        {({ register, watch }) => {
          const { is_staff: isStaff, image } = watch();
          return (
            <>
              <Input
                register={register}
                name="username"
                label="Username"
                error={errors?.username}
                isRequired
              />

              <Input
                register={register}
                name="email"
                label="Email"
                type="email"
                error={errors?.email}
                isRequired
              />

              <Input
                register={register}
                name="password"
                type="password"
                label="Password"
                error={errors?.password}
                isRequired
              />

              <Input
                register={register}
                name="first_name"
                label="First Name"
                error={errors?.first_name}
                isRequired
              />

              <Input
                register={register}
                name="last_name"
                label="Last Name"
                error={errors?.last_name}
                isRequired
              />
              <Checkbox
                register={register}
                name="is_staff"
                label="Register as Instructor?"
              />

              {
                isStaff
                  ? (
                    <Input
                      register={register}
                      name="instructor_password"
                      type="password"
                      label="Add the password to register as an instructor"
                      error={errors?.instructor_password}
                      isRequired
                    />
                  ) : (
                    <>
                      <Select
                        name="cohort"
                        register={register}
                        label="Select your Cohort"
                        title="Cohort #"
                        options={cohorts}
                        error={errors?.cohort}
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
                      />

                      <FileInput
                        name="image"
                        register={register}
                        label="Upload a profile image"
                        filename={image ? image[0]?.name : undefined}
                        error={errors?.image as string}
                      />
                    </>
                  )
              }
            </>
          );
        }}
      </AppForm>
    </Layout>
  );
}

export default Register;
