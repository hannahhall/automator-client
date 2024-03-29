import {
  useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  Checkbox, Input, Select, Textarea, FileInput,
} from '../components/form-elements';
import { fetchCohorts } from '../data/cohort';
import { TCohort, TUserForm } from '../interfaces';

import Layout from '../components/layout';
import AppForm from '../components/form-elements/app-form';
import { registerUser } from '../data/auth';
import { useAuth } from '../hooks/useAuth';

function Register() {
  const [cohorts, setCohorts] = useState<TCohort[]>([]);
  const [errors, setErrors] = useState<TUserForm>(null);
  const router = useRouter();

  const { setAccessToken, setRefreshToken, setIsAuthenticated } = useAuth();

  const handleSubmit = (user: TUserForm) => {
    const copy = {
      ...user,
      image: user.image[0],
      is_staff: user.is_staff ? 1 : 0,
    };
    return registerUser(copy).then((res) => {
      const { data } = res;
      setIsAuthenticated(true);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      router.push('/');
    });
  };

  useEffect(() => {
    fetchCohorts().then((res) => {
      setCohorts(res.data);
    });
  }, []);

  return (
    <Layout title="Automator | Register">
      <AppForm<TUserForm>
        title="Register"
        onSubmit={handleSubmit}
        cancelRoute="/login"
        setErrors={setErrors}
      >
        {({ register, watch }) => {
          const { is_staff: isStaff, image } = watch();
          return (
            <>
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
                        error={errors?.cohort as string}
                        isRequired
                      />

                      <Input
                        register={register}
                        name="github_handle"
                        label="Github Username"
                        error={errors?.github_handle}
                        addlClass="has-addons"
                        addOns={(
                          <p className="control">
                            <span className="button is-static">
                              https://github.com/
                            </span>
                          </p>
                        )}
                        validation={(value: string) => {
                          if (value.toLowerCase().includes('github')) {
                            return 'Only include your username, not the full URL';
                          }
                          return true;
                        }}
                        isRequired
                      />

                      <Input
                        register={register}
                        name="linkedin"
                        label="Linkedin Username"
                        error={errors?.linkedin}
                        addlClass="has-addons"
                        addOns={(
                          <p className="control">
                            <span className="button is-static">
                              https://www.linkedin.com/in/
                            </span>
                          </p>
                        )}
                        validation={(value: string) => {
                          if (value.toLowerCase().includes('linkedin')) {
                            return 'Only include your username, not the full URL';
                          }
                          return true;
                        }}
                        isRequired
                      />

                      <Input
                        register={register}
                        name="resume_link"
                        label="Resume Link"
                        error={errors?.resume_link}
                        isRequired={false}
                        validation={(value: string) => {
                          const regex = /^(http|https):\/\/[^ "]+$/;
                          if (value && !regex.test(value)) {
                            return 'Please enter a valid URL';
                          }
                          return true;
                        }}
                      />

                      <Input
                        register={register}
                        name="podcast_link"
                        label="Podcast Link"
                        error={errors?.podcast_link}
                        isRequired={false}
                        validation={(value: string) => {
                          const regex = /^(http|https):\/\/[^ "]+$/;
                          if (value && !regex.test(value)) {
                            return 'Please enter a valid URL';
                          }
                          return true;
                        }}
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
