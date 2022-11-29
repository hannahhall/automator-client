import Image from 'next/image';
import { useState, useEffect } from 'react';
import { fetchStudent } from '../../data/auth';
import { useAuth } from '../../hooks/useAuth';
import { IStudentDetail } from '../../interfaces';
import Panel from '../panel';
import ProjectList from '../projects/project-list';
import StudentDetail from './student-detail';

function StudentIndex() {
  const [student, setStudent] = useState<IStudentDetail>(null);

  const { getAccessToken } = useAuth();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      fetchStudent(token).then((res) => {
        const { data } = res;
        setStudent(data);
      });
    }
  }, [getAccessToken()]);

  if (!student) {
    return <div>Is Loading</div>;
  }

  return (
    <Panel
      heading={`${student.first_name.value} ${student.last_name.value}`}
      headingRight={(
        <figure className="image is-128x128">
          {
            student.circle_image.value
              ? <Image className="is-rounded" layout="fill" src={student?.circle_image?.value} alt="Profile Image" />
              : <i className="fas fa-smile" />
          }
        </figure>
      )}
    >
      <div className="columns is-multiline m-2 student-index">
        <div className="column is-two-thirds">
          <StudentDetail student={student} />
        </div>
        <div className="column">
          <ProjectList />
        </div>
      </div>
    </Panel>
  );
}

export default StudentIndex;
