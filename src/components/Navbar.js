import './Navbar.css'
import { useTheme } from '../hooks/useTheme';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import MobileNavigation from './burger/MobileNavigation';
import Navigation from '../components/burger/Navigation'
import Triangle from '../assets/triangle.svg'
import ThemeSelector from '../components/ThemeSelector';


function Navbar() {
  const { user } = useAuthContext()
  const { mode } = useTheme()

  return (
    <div className={`navbar ${mode}`}>
      <ul>
        <li className='logo'>
          <Link to='/'>
            <img src={Triangle} alt='logo' />
            <span>Task Platform</span>
          </Link>
        </li>

        <ThemeSelector />

        {!user && (
          <>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li>
          </>
        )}

        {user && (
          <>
            <Navigation />
            <MobileNavigation />
          </>
        )}

      </ul>
    </div>
  );
}

export default Navbar;
