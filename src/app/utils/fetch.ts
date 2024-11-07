import axios from 'axios';
import { ApiResponse, ApiResponseSingleFetch } from '../types/type';

const userApiKey = process.env.NEXT_PUBLIC_PAYLOAD_API;

export default async function fetchData<T = any>(
  url: string,
  slug: string,
  isSingleFetch: boolean = false
): Promise<ApiResponse<T> | ApiResponseSingleFetch<T>> {
  let error: string | null = null;
  let data: any = null;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `${slug} API-Key ${userApiKey}`,
      },
    });
    
    data = response.data;
  } catch (err) {
 
    if (err instanceof Error) {
      error = err.message;
    }
  }

  // Return either a single fetch response or paginated response based on `isSingleFetch`
  if (isSingleFetch) {
    return { data: data as T, error } as ApiResponseSingleFetch<T>;
  } else {
    return { data: data as ApiResponse<T>['data'], error } as ApiResponse<T>;
  }
}
