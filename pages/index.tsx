import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import ProgramList from '../components/programs/list';
import { useAuth } from '../hooks/useAuth';
import { User } from '../interfaces';

function IndexPage() {
  const [user, setUser] = useState<User>(null);
  const { getUser } = useAuth();

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);
  return (
    <Layout title="Automator | Programs">
      {
        user?.is_staff
          ? (
            <ProgramList />
          ) : (
            <p>Student Homepage</p>
          )
      }
    </Layout>
  );
}

export default IndexPage;
