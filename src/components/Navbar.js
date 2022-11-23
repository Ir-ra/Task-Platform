import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

function Navbar() {
    const { user } = useAuthContext()
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
                            <button className='btn'>Logout</button>
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
}

export default Navbar;