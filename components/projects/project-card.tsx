import { Project } from '../../interfaces';

interface ProjectCardProps {
  project: Project,
  handleDelete: (projectId: number) => void;
}

function ProjectCard({ project, handleDelete }: ProjectCardProps) {
  return (
    <div className="media">
      <div className="media-content">
        <div className="content">
          <p>
            <strong>
              {project.title}
            </strong>
            <br />
            {project.description}
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item" href={project.github_url}>
              <span className="icon is-medium"><i className="fab fa-md fa-github" /></span>
            </a>
            <a className="level-item" href={project.deployed_url}>
              <span className="icon is-medium"><i className="fas fa-md fa-link" /></span>
            </a>
            <a className="level-item" href={`/projects/${project.id}/edit`}>
              <span className="icon is-medium has-text-warning"><i className="fas fa-md fa-edit" /></span>
            </a>
            <button type="button" className="level-item button is-ghost" onClick={() => handleDelete(project.id)} data-testid={`delete-project-${project.id}`}>
              <span className="icon is-medium has-text-danger"><i className="fas fa-md fa-trash" /></span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default ProjectCard;
