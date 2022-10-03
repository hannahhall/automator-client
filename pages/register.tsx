import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  Checkbox, Input, Select, Textarea, FileInput,
} from '../components/form-elements';
import { fetchCohorts } from '../data/cohort';
import { ICohort, IUserForm } from '../interfaces';

import Layout from '../components/layout';
import AppForm from '../components/form-elements/app-form';
import { registerUser } from '../data/auth';
import { useAuth } from '../hooks/useAuth';

function Register() {
  const [cohorts, setCohorts] = useState<ICohort[]>([]);
  const [user, setUser] = useState<IUserForm>({
    email: '',
    username: '',
    password: '',
    is_staff: false,
  });
  const [errors, setErrors] = useState<IUserForm>(null);
  const router = useRouter();

  const { setAccessToken, setRefreshToken } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(user).then((res) => {
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

  const handleImage = (image: string) => {
    user.image = image;
    setUser(user);
  };

  useEffect(() => {
    fetchCohorts().then((res) => {
      setCohorts(res.data);
    });
  }, []);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const copy = { ...user };
    if (target.id === 'is_staff') {
      copy[target.id] = target.checked;
    } else {
      copy[target.id] = target.value;
    }
    setUser(copy);
  };

  return (
    <Layout title="Automator | Register">
      <AppForm title="Register" onSubmit={handleSubmit} onCancel={handleCancel}>
        <>
          <Input
            id="username"
            label="Username"
            onChangeEvent={handleOnChange}
            error={errors?.username}
            isRequired
          />

          <Input
            id="email"
            label="Email"
            type="email"
            onChangeEvent={handleOnChange}
            error={errors?.email}
            isRequired
          />

          <Input
            id="password"
            type="password"
            label="Password"
            onChangeEvent={handleOnChange}
            error={errors?.password}
            isRequired
          />

          <Input
            id="first_name"
            label="First Name"
            onChangeEvent={handleOnChange}
            error={errors?.first_name}
            isRequired
          />

          <Input
            id="last_name"
            label="Last Name"
            onChangeEvent={handleOnChange}
            error={errors?.last_name}
            isRequired
          />
          <Checkbox
            id="is_staff"
            label="Register as Instructor?"
            onChangeEvent={handleOnChange}
          />

          {
            user.is_staff
              ? (
                <Input
                  id="instructor_password"
                  type="password"
                  label="Add the password to register as an instructor"
                  onChangeEvent={handleOnChange}
                  error={errors?.instructor_password}
                  isRequired
                />
              ) : (
                <>
                  <Select
                    id="cohort"
                    label="Select your Cohort"
                    title="Cohort #"
                    options={cohorts}
                    onChangeEvent={handleOnChange}
                    error={errors?.cohort}
                    isRequired
                  />

                  <Input
                    id="github_handle"
                    label="Github Username"
                    onChangeEvent={handleOnChange}
                    error={errors?.github_handle}
                    isRequired
                  />

                  <Input
                    id="linkedin"
                    label="Linkedin Username"
                    onChangeEvent={handleOnChange}
                    error={errors?.linkedin}
                    isRequired={false}
                  />

                  <Input
                    id="resume_link"
                    label="Resume Link"
                    onChangeEvent={handleOnChange}
                    error={errors?.resume_link}
                    isRequired={false}
                  />

                  <Input
                    id="podcast_link"
                    label="Podcast Link"
                    onChangeEvent={handleOnChange}
                    error={errors?.podcast_link}
                    isRequired={false}
                  />

                  <Input
                    id="favorite_quote"
                    label="Favorite Quote"
                    onChangeEvent={handleOnChange}
                    error={errors?.favorite_quote}
                    isRequired={false}
                  />

                  <Textarea
                    id="bio"
                    label="Bio"
                    placeholder="Write a short paragraph about yourself"
                    onChangeEvent={handleOnChange}
                    error={errors?.bio}
                    isRequired={false}
                  />

                  <FileInput
                    id="image"
                    label="Upload a profile image"
                    onChangeEvent={handleImage}
                  />
                </>
              )
          }
        </>
      </AppForm>
    </Layout>
  );
}

export default Register;
