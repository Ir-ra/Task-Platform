import './OnlineUsers.css';

import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';
import { useTheme } from '../hooks/useTheme';

function OnlineUsers() {
    const { documents, error } = useCollection('USERs')
// console.log(documents)
const {mode} = useTheme()

    return (
        <div className={`user-list ${mode}`}>
            <h2>All users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className='online-user'></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} /> 
                </div>
            ))}
        </div>
    );
}

export default OnlineUsers;