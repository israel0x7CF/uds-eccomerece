"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const userApiKey = process.env.NEXT_PUBLIC_PAYLOAD_API;

type UseFetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function useFetch<T = any>(url: string,slug:string): UseFetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `${slug} API-Key ${userApiKey}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
