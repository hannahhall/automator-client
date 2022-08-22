import React, { useState } from "react";

import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";
import { AxiosError } from "axios";


const Login = (): React.ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loading, isAuthenticated, login } = useAuth();
  const router = useRouter();

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
    setErrorMessage("");
    login(username, password).then(() => {
      router.push('/')
    }).catch((error: AxiosError) => {
      const { response: { data } }: any = error
      setErrorMessage(data.detail);
    });
  };

  if (!loading && isAuthenticated) router.push("/");

  return (
    <Layout>
      <form  onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />


        <label htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button type="submit">
          Login
        </button>
        {errorMessage ? (
          <p className="text-red-400">Error: {errorMessage}</p>
        ) : null}
      </form>
    </Layout>
  );
};

export default Login;
