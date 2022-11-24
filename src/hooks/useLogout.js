import { useEffect, useState } from "react"
import {projectAuth, projectFirestore} from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    //for clean up function
    const [isCancelled, setIsCancelled] = useState(false)

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch, user} = useAuthContext()

    const logOut = async () => {
        setError(null)
        setIsPending(true)

        //sign OUT user 
        try {
            //(id user = id document)
            //update online status:
            const {uid} = user
            await projectFirestore.collection('USERs').doc(uid).update({online: false})

            await projectAuth.signOut()

            //dispatcj logout action
            dispatch({type: 'LOGOUT'})

            //update state 
            if(!isCancelled){
                setIsPending(false)
            setError(null)
            }
            
        } catch (error) {
            if(!isCancelled){
                console.log(error.message)
                setError(error.message)
                setIsPending(false)
            }
        }
    }

    //CLEAN up function
    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return {logOut, error, isPending}
}