import './Signup.css'
import { useState } from 'react';
import { useSignUp } from '../../hooks/useSignUp';
import { useTheme } from '../../hooks/useTheme';
import imageCompression from 'browser-image-compression';
import { Loader } from '../../components/Loader';

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
      setFormError('Please fix errors before submitting the form.')
    } else {
      signUp(email, password, displayName, thumbnail)
    }
  }

  const handleFileChange = async (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)

    if (!selected) {
      return;
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('The file must be an image')
      return
    }

    console.log('selected instanceof Blob', selected instanceof Blob);
    console.log(`selected size ${selected.size / 1024 / 1024} MB`);

    if (selected.size > 200000) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 200,
          useWebWorker: true
        }

        const compressedFile = await imageCompression(selected, options);
        selected = compressedFile;
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      } catch (error) {
        console.log(error);
        setThumbnailError('Image can not be compressed, please choose another image.')
      }
    }

    setThumbnailError(null)
    setThumbnail(selected)
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

        {isPending && <button className={`btn ${mode}`} disabled><Loader /></button>}

        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
}

export default Signup;
