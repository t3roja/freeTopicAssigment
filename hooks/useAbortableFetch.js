import React, { useEffect, useRef, useState } from 'react'

export default function useAbortableFetch(url) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const controllerRef = useRef()

    useEffect(() => {
        getData(url)
    }, [url])

    const getData = (url) => {
        if (controllerRef.current) {
            controllerRef.current.abort()
        }
        controllerRef.current = new AbortController()
        const signal = controllerRef.current.signal

        setLoading(true)
        fetch(url, { signal })
            .then(response => response.json())
            .then((json) => {
                setLoading(false)
                setData(json)
            }).catch((error) => {
                setError(error)
                setLoading(false)
            })

    }

    return { data, loading, error }
}
