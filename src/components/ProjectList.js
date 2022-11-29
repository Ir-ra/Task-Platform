
// styles
import './ProjectList.css'

function ProjectList({ projects }) {

    return (
        <div>
            {/* in case there is no projects */}
            {projects.length === 0 && <p>No projects yet!</p>}

            {projects.map(project => (
                <div key={project.id}>{project.name}</div>  //name це з Create.js де створювали сам project document (project)

            ))}
        </div>
    );
}

export default ProjectList;