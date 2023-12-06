import Avatar from "../../components/Avatar";
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('PROJECTs');
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const { mode } = useTheme();

    const handleClick = (e) => {
        deleteDocument(project.id)
        navigate('/')
    }
    return (
        <div>
            <div className={`project-summary ${mode}`}>
                <p>By {project.createdBy.displayName}</p>
                <h2 className="project-title">{project.name}</h2>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                            <p>{user.displayName}</p>
                        </div>
                    ))}
                </div>


            </div>
            {user.uid === project.createdBy.id && (
                <button className={`btn ${mode}`} onClick={handleClick}>Mark as complete</button>
            )}
        </div>
    );
}

export default ProjectSummary;