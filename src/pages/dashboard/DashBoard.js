import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection'

// styles
import './DashBoard.css'

function DashBoard() {
    const { documents, error } = useCollection('PROJECTs')

    return (
        <div>
            <h2 className='page-title'>DashBoard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectList projects={documents} />}
        </div>
    );
}

export default DashBoard;