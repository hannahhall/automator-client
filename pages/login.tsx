import { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useAuth } from '../hooks/useAuth';
import { ApiError, TUserForm } from '../interfaces';
import AppForm from '../components/form-elements/app-form';
import { Input } from '../components/form-elements';

function Login(): ReactElement {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = (
    data,
  ): void => {
    login(data.username, data.password).then(() => {
      router.push('/');
    }).catch((error: ApiError) => {
      const { response } = error;
      setErrorMessage(response.data.detail);
    });
  };

  const handleCancel = () => {
    router.push('/register');
  };

  return (
    <Layout title="Automator | Login">
      <AppForm<TUserForm> title="Login" onSubmit={onSubmit} onCancel={handleCancel}>
        {({ register }) => (
          <>
            <Input
              name="username"
              label="Username"
              register={register}
              isRequired
            />

            <Input
              name="password"
              type="password"
              label="Password"
              register={register}
              isRequired
            />
          </>
        )}
      </AppForm>
      {errorMessage ? (
        <p className="text-red-400">
          {errorMessage}
        </p>
      ) : null}
    </Layout>
  );
}

export default Login;
