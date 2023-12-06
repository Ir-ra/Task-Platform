import { useState, useEffect } from "react"
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useSignUp = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signUp = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {
            const response = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(response.user)

            if (!response) {
                throw new Error('Could not complete signup')
            }

            const uploadPath = `thumbnails/${response.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

            await response.user.updateProfile({ displayName, photoURL: imgUrl })

            await projectFirestore.collection('USERs').doc(response.user.uid).set({
                online: true,
                displayName,
                photoURL: imgUrl
            })

            dispatch({ type: 'LOGIN', payload: response.user })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (error) {
            if (!isCancelled) {
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { error, isPending, signUp }
}
