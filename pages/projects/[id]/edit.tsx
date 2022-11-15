import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../components/layout';
import { updateProject, fetchProject } from '../../../data/project';
import { useAuth } from '../../../hooks/useAuth';
import { Project } from '../../../interfaces';
import ProjectForm from '../../../components/projects/project-form';

function EditProject() {
  const router = useRouter();
  const [errors, setErrors] = useState<Project>(null);
  const [initialData, setInitialData] = useState<Project>(null);

  const { getAccessToken } = useAuth();

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchProject(id as string, getAccessToken()).then((res) => {
        const { data } = res;
        setInitialData(data);
      });
    }
  }, [router.query, setInitialData]);

  const handleProjectSubmit = (project: Project) => (
    updateProject(project, getAccessToken()).then(() => {
      router.push('/');
    })
  );

  return (
    <Layout title="Automator | Edit Project">
      <ProjectForm
        title={`Edit ${initialData?.title}`}
        initialData={initialData}
        handleSubmit={handleProjectSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </Layout>
  );
}

export default EditProject;
