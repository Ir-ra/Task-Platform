//to set up a real time listener to specafic document
import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    //real time data for document
    useEffect(() => {
        //we need to get a reference to document inside our store db
        const ref = projectFirestore.collection(collection).doc(id)

        const unsubscribe = ref.onSnapshot((snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })  //name, assigned users of project ...
                setError(null)
            } else {
                setError('No such document exists')
            }

        }, (error) => {
            console.log(error)
            setError('Failed to get document')
        })

        //Clean up f-n, to unsubscribe if weleave the page
        //return f-n which fires whenever the component that uses this hook on mounts
        //if we go to a different page, its going to unmount and fire clean up f-n
        return () => unsubscribe()

    }, [collection, id])

    return { document, error }
}