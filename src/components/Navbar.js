import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
    const { user } = useAuthContext()
    const { logOut, isPending } = useLogout()
    
    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt='logo' />
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