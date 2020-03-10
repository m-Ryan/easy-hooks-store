import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { useState } from 'react';


export function useServices() {
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const getData = (fn: any) => {
    setLoading(true)
    return fn
      .then(setResult)
      .catch(setError)
      .finally(() => setLoading(false));
  }

  const postData = () => {

  }

  return {
    getData
  }

}

// getMenu(): Promise<IAppMenuItem[]> {
//     return Promise.resolve([
//       {
//         name: '数据模板',
//         icon: 'bar-chart',
//         isOpen: true,
//         children: [
//           {
//             name: '数据模板',
//             url: '/'
//           }

//         ]
//       }
//     ])
//   }