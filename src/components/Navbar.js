import './Navbar.css'
import Triangle from '../assets/triangle.svg'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

import { NavLink } from 'react-router-dom';
import DashboardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import ThemeSelector from './ThemeSelector';
import { useTheme } from '../hooks/useTheme';

function Navbar() {
    const { user } = useAuthContext()
    const { logOut, isPending } = useLogout()
    const { mode } = useTheme()
    
    return (
        <div className={`navbar ${mode}`}>
            <ul>
                <li className='logo'>
                    <img src={Triangle} alt='logo' />
                    <span>The Platform</span>
                </li>
                
                {!user && (
                    <>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/signup'>Signup</Link></li>
                    </>
                )}

                {user && (
                    <>
                    <div><ThemeSelector/></div>
                    
                    <div className='sidebar-links'>
                            <NavLink  to='/'>
                                <img src={DashboardIcon} alt='dashboard icon' />
                            </NavLink>
                        
                            <NavLink to='/create'>
                                <img src={AddIcon} alt='add icon' />
                            </NavLink>
                        </div>

                        <li>
                            {!isPending && <button className='btn' onClick={logOut}>Logout</button>}
                            {isPending && <button className='btn' disabled>Logging out...</button>}
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
}

export default Navbar;