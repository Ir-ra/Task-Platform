import Avatar from "../../components/Avatar";
function ProjectSummary({ project }) {
    return (
        <div>
            <div className="project-summary">
                <h2 className="project-title">{project.name}</h2>  {/*like project document fronm Create*/}
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:
                    <div className="assigned-users">
                        {project.assignedUsersList.map(user => (
                            <div key={user.id}>
                                <Avatar src={user.photoURL} />
                                <p>{user.displayName}</p>
                            </div>
                        ))}
                    </div>
                </h4>
            </div>
        </div>
    );
}

export default ProjectSummary;