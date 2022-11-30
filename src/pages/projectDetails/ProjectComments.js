import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'

function ProjectComments() {
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            //making unique id for each comment
            id: Math.random()
        }
        console.log(commentToAdd)
    }

    return (
        <div className='project-comments'>
            <h4>Project Comments</h4>
            <form className='add-comment' onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />

                    <button className='btn'>Add comment</button>
                </label>
            </form>
        </div>
    );
}

export default ProjectComments;