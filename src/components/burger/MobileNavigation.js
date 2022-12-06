import './MobileNavigation.css'

import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../assets/dashboard_icon.svg';
import AddIcon from '../../assets/add_icon.svg';
import { useTheme } from '../../hooks/useTheme';
import { CgMenuRound } from 'react-icons/cg';
import { AiOutlineLogout } from 'react-icons/ai';
import { CgCloseO } from 'react-icons/cg';
import { useState } from 'react';



const MobileNavigation = () => {
    const { user } = useAuthContext()
    const { logOut, isPending } = useLogout()
    const { mode } = useTheme()

    const [open, setOpen] = useState(false)

    const hamburgerOpenIcon = <CgMenuRound className='hamburger' />
    const hamburgerCloseIcon = <CgCloseO className='hamburger' />

    return (
        <div className={`mobile-navigation ${mode}`} onClick={() => setOpen(!open)}>
           
            {open ? hamburgerCloseIcon : hamburgerOpenIcon}
            {open &&
                <div className={`navbar ${mode}`}>

                    {user && (
                        <>
                            <div className='sidebar-links'>

                                <div>
                                    <NavLink to='/'>
                                        <p>Dashboard</p>
                                        {/* <img src={DashboardIcon} alt='dashboard icon' /> */}
                                        
                                    </NavLink>
                                </div>

                                <div>
                                    <NavLink to='/create'>
                                        <p>Add project</p>
                                        {/* <img src={AddIcon} alt='add icon' /> */}
                                       
                                    </NavLink>
                                </div>

                                <div className='logOut'>
                                    
                                    {!isPending && <Link onClick={logOut}><p>Logout</p></Link>}
                                    {isPending && <Link disabled><p>Logging out...</p></Link>}
                                    {/* <AiOutlineLogout className='out' /> */}
                                </div>
                            </div>

                        </>
                    )}


                </div>
            }
        </div>
    );

}

export default MobileNavigation;