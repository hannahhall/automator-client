import { useEffect, useState } from 'react';
import Layout from '../components/layout';
import ProgramList from '../components/programs/list';
import StudentIndex from '../components/student/student-index';
import { useAuth } from '../hooks/useAuth';
import { User } from '../interfaces';

function IndexPage() {
  const [user, setUser] = useState<User>(null);
  const { getUser } = useAuth();

  useEffect(() => {
    setUser(getUser());
  }, [getUser]);

  if (!user) return <div>Loading...</div>;

  return (
    <Layout title="Automator | Programs">
      <div className="columns is-multiline">
        {
          user?.is_staff
            ? (
              <div className="column">
                <ProgramList />
              </div>
            ) : (
              <div className="column">
                <StudentIndex />
              </div>
            )
        }
      </div>
    </Layout>
  );
}

export default IndexPage;
