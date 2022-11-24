import './Signup.css'
import { useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)

    //Витягаємо те що нам потрібно з useSignUp (це те що там вертаємо)
    const { error, isPending, signUp } = useSignUp()

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]

        //---making check for image
        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        //if the file does not include type:image
        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image')
            return
        }
        //checking the size
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kb')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
    }

    return (
        <div>
            <form className='auth-form' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

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

                <label>
                    <span>display name:</span>
                    <input
                        required
                        type='text'
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                    />
                </label>

                <label>
                    <span>profile thumbnail:</span>
                    <input
                        required
                        type='file'
                        onChange={handleFileChange}
                    />
                    {thumbnailError && <div className='error'>{thumbnailError}</div>}
                </label>

                {!isPending && <button className='btn'>Sign Up</button>}
                {isPending && <button className='btn' disabled>...</button>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}

export default Signup;