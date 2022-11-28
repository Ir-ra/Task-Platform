import './Create.css'
import { useEffect, useState } from 'react'
import Select from 'react-select';
import { useCollection } from '../../hooks/useCollection'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
];

function Create() {
    const { documents } = useCollection('USERs')

    const [users, setUsers] = useState([])

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])

    // const {addDocument} = useFirestore()

    const handleSubmit = (e) => {
        e.preventDefault()
        // addDocument({name, details, dueDate})
        console.log(name, details, dueDate, category.value, assignedUsers)
    };
    //we are going to map throu documents an make new arr based on arr of users
    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }  //value:user це і є весь обьект юзера
            })
            setUsers(options)
        }
    }, [documents])


    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project name:</span>
                    <input
                        required
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                <label>
                    <span>Project details:</span>
                    <textarea
                        required
                        type='text'
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    />
                </label>

                <label>
                    <span>Set due date:</span>
                    <input
                        required
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>

                <label>
                    <span>Project category:</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>

                <label>
                    <span>Assign to:</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={users}
                        isMulti  //can select multiple users
                    />
                </label>

                <button className='btn'>Add Project</button>
            </form>
        </div>
    );
}

export default Create;