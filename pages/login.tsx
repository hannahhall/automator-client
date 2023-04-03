import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useAuth } from '../hooks/useAuth';
import { TUserForm } from '../interfaces';
import AppForm from '../components/form-elements/app-form';
import { Input } from '../components/form-elements';

function Login(): ReactElement {
  const [errors, setErrors] = useState<TUserForm>(null);
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = (data) => (
    login(data.username, data.password).then(() => {
      router.push('/');
    })
  );

  return (
    <Layout title="Automator | Login">
      <AppForm<TUserForm>
        title="Login"
        onSubmit={onSubmit}
        cancelRoute="/register"
        setErrors={setErrors}
      >
        {({ register }) => (
          <>
            <Input
              name="username"
              label="Email"
              register={register}
              error={errors?.username}
              isRequired
            />

            <Input
              name="password"
              type="password"
              label="Password"
              register={register}
              error={errors?.password}
              isRequired
            />
          </>
        )}
      </AppForm>
      {errors?.detail ? (
        <p className="text-red-400">
          {errors?.detail}
        </p>
      ) : null}
    </Layout>
  );
}

export default Login;
