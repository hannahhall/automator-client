import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import { createProject } from '../../data/project';
import { useAuth } from '../../hooks/useAuth';
import { Project } from '../../interfaces';
import ProjectForm from '../../components/projects/project-form';

function CreateProject() {
  const router = useRouter();
  const [errors, setErrors] = useState<Project>(null);

  const { getAccessToken } = useAuth();

  const handleProjectSubmit = (project: Project) => (
    createProject(project, getAccessToken()).then((response) => {
      const { data } = response;
      router.push(`/projects/${data.id}`);
    })
  );

  return (
    <Layout title="Automator | Create Project">
      <ProjectForm
        title="Create a Project"
        handleSubmit={handleProjectSubmit}
        errors={errors}
        setErrors={setErrors}
      />
    </Layout>
  );
}

export default CreateProject;
