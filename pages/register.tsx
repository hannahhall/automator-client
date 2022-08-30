import {
  ChangeEvent, FormEvent, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { Input, Select, Textarea } from '../components/form-elements';
import { fetchCohorts } from '../data/cohort';
import { ICohort, IUserForm } from '../interfaces';

import Layout from '../components/layout';
import AppForm from '../components/form-elements/app-form';
import FileInput from '../components/form-elements/file-input';
import { registerUser } from '../data/auth';

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registerUser(user).then(() => {
      router.push('/');
    }).catch((err) => {
      const { res: data } = err;
      setErrors(data);
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
    user[target.id] = target.value;
    setUser(user);
  };

  return (
    <Layout title="Automator | Register">
      <AppForm title="Login" onSubmit={handleSubmit} onCancel={handleCancel}>
        <>
          <Input
            id="username"
            label="Username"
            onChangeEvent={handleOnChange}
            error={errors?.username}
          />

          <Input
            id="email"
            label="Email"
            type="email"
            onChangeEvent={handleOnChange}
            error={errors?.email}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            onChangeEvent={handleOnChange}
          />
          <Input
            id="passwordMatch"
            type="password"
            label="Password Match"
            onChangeEvent={handleOnChange}
          />

          <Input
            id="first_name"
            label="First Name"
            onChangeEvent={handleOnChange}
          />

          <Input
            id="last_name"
            label="Last Name"
            onChangeEvent={handleOnChange}
          />

          {
            !user.is_staff
              ? (
                <>
                  <Select
                    id="cohort"
                    label="Select your Cohort"
                    title="Cohort #"
                    options={cohorts}
                    onChangeEvent={handleOnChange}
                    error={errors?.cohort}
                  />

                  <Input
                    id="github_handle"
                    label="Github Username"
                    onChangeEvent={handleOnChange}
                    error={errors?.github_handle}
                  />

                  <Input
                    id="linkedin"
                    label="Linkedin Username"
                    onChangeEvent={handleOnChange}
                    error={errors?.linkedin}
                  />

                  <Input
                    id="resume_link"
                    label="Resume Link"
                    onChangeEvent={handleOnChange}
                    error={errors?.resume_link}
                  />

                  <Input
                    id="podcast_link"
                    label="Podcast Link"
                    onChangeEvent={handleOnChange}
                    error={errors?.podcast_link}
                  />

                  <Input
                    id="favorite_quote"
                    label="Favorite Quote"
                    onChangeEvent={handleOnChange}
                    error={errors?.favorite_quote}
                  />

                  <Textarea
                    id="bio"
                    label="Bio"
                    placeholder="Write a short paragraph about yourself"
                    onChangeEvent={handleOnChange}
                    error={errors?.bio}
                  />

                  <FileInput
                    id="image"
                    label="Upload a profile image"
                    onChangeEvent={handleImage}
                  />
                </>
              ) : null
          }
        </>
      </AppForm>
    </Layout>
  );
}

export default Register;
