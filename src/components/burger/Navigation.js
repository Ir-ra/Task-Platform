import '../../components/Navbar.css'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
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