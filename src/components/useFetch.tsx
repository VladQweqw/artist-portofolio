import { useState } from 'react';

export const ENDPOINT = `http://localhost:3333/`
function useFetch<T>(url: string, options?: RequestInit, autocall: boolean = false): {
    data: T | null,
    isLoading: boolean,
    error: string | null,
    getData: (args0: string, args1: RequestInit) => void,
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    
  
  const getData = async (url: string, options?: RequestInit) => {
      setIsLoading(true);
      setError(null);
      
      try {
          const response = await fetch(ENDPOINT + url, options);
          if (!response.ok) {
              throw new Error(`Error ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(`Error: ${(err as Error).message}`)
        } finally {
            setIsLoading(false);
        }
    };
    
    if(autocall) getData(url, options)

  return { data, error, isLoading, getData };
}

export default useFetch;
