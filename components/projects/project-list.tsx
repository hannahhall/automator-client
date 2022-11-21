import { useEffect, useState } from 'react';
import { fetchProjects, deleteProject } from '../../data/project';
import { useAuth } from '../../hooks/useAuth';
import { Project } from '../../interfaces';
import Panel from '../panel';
import ProjectCard from './project-card';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { getAccessToken } = useAuth();

  const getData = () => {
    fetchProjects(getAccessToken()).then((res) => {
      const { data } = res;
      setProjects(data);
    });
  };

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      getData();
    }
  }, [getAccessToken()]);

  const handleDelete = (projectId: number) => {
    deleteProject(projectId, getAccessToken()).then(() => getData());
  };

  return (
    <Panel heading="Projects" color="is-danger">
      {
        projects.length
          ? projects.map((project) => (
            <div key={project.id} className="panel-block">
              <ProjectCard project={project} handleDelete={handleDelete} />
            </div>
          ))
          : <div className="panel-block">Add your capstone projects with the link in the navbar</div>
      }
    </Panel>
  );
}

export default ProjectList;
