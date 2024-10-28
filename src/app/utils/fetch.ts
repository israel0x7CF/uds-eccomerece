import axios from 'axios'
import { ApiResponse } from '../types/type';

const userApiKey = process.env.NEXT_PUBLIC_PAYLOAD_API;

export default async function fetchData<T = any>(
  url: string,
  slug: string,
): Promise<ApiResponse<T>> {
  let error = null;
  let data = null;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `${slug} API-Key ${userApiKey}`,
      },
    });
    data = response.data; // assuming the response data matches the ApiResponse structure
  } catch (err) {
    if (err instanceof Error) {
      error = err.message;
    }
  }

  return { data, error };
}
