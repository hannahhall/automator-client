/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useAuth } from '../hooks/useAuth';
import { ApiError } from '../interfaces';

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

  if (!loading && isAuthenticated) router.push('/');

  return (
    <Layout title="Automator | Login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
        <button type="submit">
          Login
        </button>
        {errorMessage ? (
          <p className="text-red-400">
            Error:
            {errorMessage}
          </p>
        ) : null}
      </form>
    </Layout>
  );
}

export default Login;
