import { useEffect, useState } from 'react';
import InstructorIndex from '../components/instructor-index';
import Layout from '../components/layout';
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
              <InstructorIndex />
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
