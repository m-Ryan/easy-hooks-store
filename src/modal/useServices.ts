import { useState } from 'react';

type UnPromise<T> = T extends Promise<infer R>  ? R : T;

export function useServices<T extends (...args: any)=>any>(serviceHandler: T) {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<UnPromise<ReturnType<T>>>(null);
  const [error, setError] = useState<any>(null);

  const getData = (...payload:  Parameters<T>): ReturnType<T> => {
    setLoading(true)
    return serviceHandler(payload)
      .then(setResult)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  return {
    getData,
    loading,
    error, 
    result
  }

}