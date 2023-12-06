import { useLogIn } from '../../hooks/useLogIn'
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import './Login.css'
import { Loader } from '../../components/Loader';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { logIn, error, isPending } = useLogIn()
    const { mode } = useTheme()

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(email, password)
    }

    return (
        <form className={`auth-form ${mode}`} onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label>
                <span>email:</span>
                <input
                    required
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>

            <label>
                <span>password:</span>
                <input
                    required
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>

            {error && <div className='error'>{error}</div>}
            {!isPending && <button className={`btn ${mode}`}>Login</button>}
            {isPending && <button className={`btn ${mode}`} disabled><Loader /></button>}
        </form>
    );
}

export default Login;
