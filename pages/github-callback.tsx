import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/layout';
import { fetchGithubAuth } from '../data/auth';
import { useAuth } from '../hooks/useAuth';

function GithubCallback() {
  const router = useRouter();

  const { getRedirectTo, setGithubAccessToken } = useAuth();

  useEffect(() => {
    if (router.query.code) {
      fetchGithubAuth(router.query.code as string).then((res) => {
        setGithubAccessToken(res.data.github_token);
        router.push(getRedirectTo());
      });
    }
  }, [router.query]);

  return (
    <Layout title="Automator | Authenticating with Github">
      <div className="box">
        Getting your github credentials...
        <progress className="progress is-medium is-warning" max="100">45%</progress>
      </div>
    </Layout>
  );
}

export default GithubCallback;
