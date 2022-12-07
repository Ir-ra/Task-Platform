import './Signup.css'
import { useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import { useTheme } from '../../hooks/useTheme';
import imageCompression from 'browser-image-compression';

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const [formError, setFormError] = useState(null)
    const { mode } = useTheme()

    const { error, isPending, signUp } = useSignUp()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email || !password || !displayName || !thumbnail) {
            setFormError('Please select a file 222')
        } else {
            signUp(email, password, displayName, thumbnail)
        }
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]
        console.log(selected)
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true
        }

        try {
            console.log('selected instanceof Blob', selected instanceof Blob); // true
            console.log(`selected size ${selected.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            const compressedFile = imageCompression(selected, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            //---making check for image
            if (!selected) {
                // setThumbnailError('Please select a file')
                return
            }
            //if the file does not include type:image
            if (!selected.type.includes('image')) {
                setThumbnailError('Selected file must be an image')
                return
            }
            //checking the size
            // if (selected.size > 200000) {
            //     setThumbnailError('Image file size must be less than 200kb')
            //     return
            // }

            setThumbnailError(null)
            setThumbnail(selected)

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <form className={`auth-form ${mode}`} onSubmit={handleSubmit}>
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
                    {formError && <div className='error'>{formError}</div>}
                </label>

                {!isPending && <button className={`btn ${mode}`}>Sign Up</button>}
                {isPending && <button className={`btn ${mode}`} disabled>...</button>}
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    );
}

export default Signup;