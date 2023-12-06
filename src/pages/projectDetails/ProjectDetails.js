import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import ProjectComments from './ProjectComments';
import './ProjectDetails.css'
import ProjectSummary from './ProjectSummary';
import { Loader } from '../../components/Loader';

function ProjectDetails() {
    const { id } = useParams()  // path='/projects/:id' 
    const { document, error } = useDocument('PROJECTs', id)

    if (error) {
        return <div className='error'>{error}</div>
    }

    if (!document) {
        return <div className='loading'><Loader /></div>
    }

    return (
        <div className='project-details'>
            <ProjectSummary project={document} />
            <ProjectComments project={document}/>
        </div>
    );
}

export default ProjectDetails;
