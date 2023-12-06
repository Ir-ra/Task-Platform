import { useTheme } from "../../hooks/useTheme";
import Filter from '../../assets/filter.svg'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

function ProjectFilter({ currentFilter, changeFilter }) {
    const { mode } = useTheme()

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className={`project-filter ${mode}`}>
            <nav>
                <img src={Filter} alt='filter' />
                {filterList.map((filterItem) => (
                    <button
                        key={filterItem}
                        onClick={() => handleClick(filterItem)}
                        className={currentFilter === filterItem ? 'active' : ''}
                    >
                        {filterItem}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;
