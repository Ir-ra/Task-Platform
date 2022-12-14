import { useState } from 'react';
import ProjectList from '../../components/ProjectList';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTheme } from '../../hooks/useTheme';
import ProjectFilter from './ProjectFilter';

// styles
import './DashBoard.css'


function DashBoard() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection('PROJECTs')
    const [currentFilter, setCurrentFilter] = useState('all')
    const { mode } = useTheme()

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const filteredProjects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                console.log(document.category, currentFilter)
                return document.category === currentFilter
            default:
                return true
        }
    }) : null

    return (
        <div>
            <h2 className={`page-title ${mode}`}>DashBoard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && (
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter} />
            )}
            {filteredProjects && <ProjectList projects={filteredProjects} />}
        </div>
    );
}

export default DashBoard;