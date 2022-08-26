import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../interfaces';
import AppForm from '../components/form-elements/app-form';
import { Input } from '../components/form-elements';

function Login(): React.ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { loading, isAuthenticated, login } = useAuth();
  const router = useRouter();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();
    setErrorMessage('');
    login(username, password).then(() => {
      router.push('/');
    }).catch((error: ApiError) => {
      const { response: { data } } = error;
      setErrorMessage(data.detail);
    });
  };

  const handleCancel = () => {
    router.push('/register');
  };

  if (!loading && isAuthenticated) router.push('/');

  return (
    <Layout title="Automator | Login">
      <AppForm title="Login" onSubmit={handleSubmit} onCancel={handleCancel}>
        <>
          <Input
            id="username"
            label="Username"
            onChangeEvent={(e) => setUsername(e.target.value)}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            onChangeEvent={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </>
      </AppForm>
      {errorMessage ? (
        <p className="text-red-400">
          Error:
          {errorMessage}
        </p>
      ) : null}
    </Layout>
  );
}

export default Login;
