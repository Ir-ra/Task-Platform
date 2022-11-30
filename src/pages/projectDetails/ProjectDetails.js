import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import './ProjectDetails.css'

function ProjectDetails() {
    const { id } = useParams()  //бо path='/projects/:id' 
    const { document, error } = useDocument('PROJECTs', id)

    if (error) {
        return <div className='error'>{error}</div>
    }
    if (!document) {
        return <div className='loading'>Loading...</div>
    }

    return (
        <div className='project-details'>
            <h1>{document.name}</h1>  {/*like project document fronm Create*/}

        </div>
    );
}

export default ProjectDetails;