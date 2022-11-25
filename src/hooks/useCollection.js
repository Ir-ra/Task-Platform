//for Real Time Data

import { projectFirestore } from "../firebase/config";
import { useEffect, useRef, useState } from "react";

export const useCollection = (collectioN, _query, _orderBY) => {

  const [error, setError] = useState(null)
  const [documents, setDocuments] = useState(null)

  const query = useRef(_query).current

  //adding transaction in order
  const orderBY = useRef(_orderBY).current

  useEffect(() => {
    let ref = projectFirestore.collection(collectioN)
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBY) {
      ref = ref.orderBy(...orderBY)
    }

    const unsubscribe = ref.onSnapshot(snapshot => {

      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id }) //doc -> 
      })

      //update state
      setDocuments(results)
      setError(null)
    },
      (error) => {
        setError('Could not fetch the data')
      })

    //unsubscribe on unmount
    return () => unsubscribe()

  }, [collectioN, query, orderBY])

  return { documents, error }
}

