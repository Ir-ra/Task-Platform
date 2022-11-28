import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Avatar from './Avatar';

function Sidebar() {

    const {user} = useAuthContext()
    // console.log(user) //here is displayMane

    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user.photoURL}/>
                   <p>Hey, {user.displayName} !</p>
                </div>

                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink  to='/'>
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