import { useLogIn } from '../../hooks/useLogIn'
import { useState } from 'react';
import './Login.css'  //auth-form taking from signup.css -g

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { logIn, error, isPending } = useLogIn()

    const handleSubmit = (e) => {
        e.preventDefault()
        logIn(email, password)
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
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
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled>...</button>}
        </form>
    );
}

export default Login;