import '../../components/Navbar.css'
import Triangle from '../../assets/triangle.svg'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'

import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../assets/dashboard_icon.svg';
import AddIcon from '../../assets/add_icon.svg';
import ThemeSelector from '../../components/ThemeSelector';
import { useTheme } from '../../hooks/useTheme';



function Navbar() {
    const { user } = useAuthContext()
    const { logOut, isPending } = useLogout()
    const { mode } = useTheme()

    return (
        <div className='navigation'>
            <div className={`navbar ${mode}`}>

                <ul>
                    {user && (
                        <>
                            <div>
                                {!isPending && <button className={`btn ${mode}`} onClick={logOut}>Logout</button>}
                                {isPending && <button className={`btn ${mode}`} disabled>Logging out...</button>}
                            </div>
                        </>
                    )}

                </ul>
            </div>
        </div>
    );
}

export default Navbar;