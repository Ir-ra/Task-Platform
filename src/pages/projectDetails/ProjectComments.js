import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useTheme } from '../../hooks/useTheme';
import Avatar from '../../components/Avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function ProjectComments({ project }) {
    const [newComment, setNewComment] = useState('')
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('PROJECTs')
    const { mode } = useTheme()

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
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className={`project-comments ${mode}`}>
            <h4>Project Comments</h4>

            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-author'>
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className='comment-date'>
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className='comment-content'>
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form className='add-comment' onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    />

                    <button className={`btn ${mode}`}>Add comment</button>
                </label>
            </form>
        </div>
    );
}

export default ProjectComments;