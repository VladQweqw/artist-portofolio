import axios from 'axios'
import { useEffect, useState } from 'react'

export const endpoint = 'http://localhost:3333/'

export default function useFetch(options: {
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    url: string,
    data: never | object,
    headers: any
} | null = null) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    
    if(options) {
        options.url = endpoint + options.url
    }

    useEffect(() => {
        if(options) {
            setIsLoading(true)

            axios(options).then((resp) => {
                const data = resp.data
                setData(data)            
                setIsLoading(false)
            })
            .catch((err) => {
                setError(`Error: ${err}`)
            }) 
            .finally(() => setIsLoading(false))
        }
        
    }, [])

    
    function call(options: {
        method: 'POST' | 'GET' | 'PUT' | 'DELETE',
        url: string,
        data: never | object,
        headers: any 
    }) {
        setIsLoading(true)
        options.url = endpoint + options.url
        
        axios(options).then((resp) => {
            const data = resp.data
            setData(data)            
            setIsLoading(false)
        })
        .catch((err) => {
            setError(`Error: ${err}`)
        }) 
        .finally(() => setIsLoading(false))
    }


    return {data, isLoading, error, call}
}