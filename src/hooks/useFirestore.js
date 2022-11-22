//add, del, upd
import { useEffect, useState, useReducer } from "react"
import {projectFirestore, timestamp} from '../firebase/config' //для взаємодіїї з датабазою проекту

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null}
        case 'ADDED_DOC':
            return {isPending: false, document: action.payload, success: true, error: null}    
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
        case 'DELETED_DOCUMENT':
            return {isPending: false, document: null, success: true, error: null}
        
        default:
            return state
    }
}

export const useFirestore = (collectioN) => {  //coll-n це то що створили в ДБ
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    
    //for clean up fun-n
    const [isCancelled, setIsCancelled] = useState(false)

    //collection reference
    const ref = projectFirestore.collection(collectioN)

            //only dispatch if not Cancelled
            const dispatchIfNotCancelled = (action) => {
                if(!isCancelled) {
                    dispatch(action)
                }
            }

    //add document
    const addDocument = async(doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})  //({name, amount}) типу це і є doc
            dispatchIfNotCancelled({type: 'ADDED_DOC', payload: addedDocument})
        } 
        catch (error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: error.message})
        }
    }    

    //delete document
    const deleteDocument = async(id) => {
        dispatch({type: 'IS_PENDING'})
        
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})
        } 
        catch (error) {
            dispatchIfNotCancelled({type: 'ERROR', payload: 'Could not delete'})
        }
    } 

    //CLEAN up function
    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return {addDocument, deleteDocument, response}
}