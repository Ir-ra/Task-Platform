import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <div className='user'>
                    {/* avatar and username here later */}
                    <p>hey user</p>
                </div>

                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={DashboardIcon} alt='dashboard icon' />
                                <span>DashBoard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/create'>
                                <img src={AddIcon} alt='add icon' />
                                <span>Add project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;