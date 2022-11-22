import { useEffect, useState } from "react"
import {projectAuth} from '../firebase/config'
import { useAuthContext } from "./useAuthContext"

export const useLogIn = () => {

    //for clean up function
    const [isCancelled, setIsCancelled] = useState(false)

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const {dispatch} = useAuthContext()

    const logIn = async (email, password) => {
        setError(null)
        setIsPending(true)

        //sign user OUT
        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            //dispatcj logout action
            dispatch({type: 'LOGIN', payload: res.user})

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

    return {logIn, error, isPending}
}