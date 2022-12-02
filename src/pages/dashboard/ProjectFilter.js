import { useTheme } from "../../hooks/useTheme";
import Filter from '../../assets/filter.svg'

//add filters, thou what going to map
const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

function ProjectFilter({ currentFilter, changeFilter }) {

    const { mode } = useTheme()

    const handleClick = (newFilter) => {
        // console.log(newFilter)
        changeFilter(newFilter)

    }

    return (
        <div className={`project-filter ${mode}`}>
            <nav>
                <img src={Filter} alt='filter' />
                {filterList.map((f) => (
                    <button
                        key={f}
                        onClick={() => handleClick(f)}
                        className={currentFilter === f ? 'active' : ''}
                    >
                        {f}
                    </button>
                ))}
            </nav>
        </div>
    );
}

export default ProjectFilter;