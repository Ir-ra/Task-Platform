import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import { useTheme } from '../hooks/useTheme';
// styles
import './ProjectList.css'

function ProjectList({ projects }) {
  const { mode } = useTheme()
  console.log(projects)
  return (
    <div className={`project-list ${mode}`}>
      {projects.length === 0 && <p>No projects yet!</p>}

      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}>

          <h4>{project.name}</h4>

          <p className='category'>
            <i>{project.category}</i>
          </p>

          <p>Due by {project.dueDate.toDate().toDateString()}</p>

          <div className='assigned-to'>
            <ul>
              {project.assignedUsersList.map(user => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>

      ))}
    </div>
  );
}

export default ProjectList;
