import { useState, useEffect } from "react";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface IUseAxios<T> {
  response: AxiosResponse<T> | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

const useAxios = <T>(
  url: string,
  options?: AxiosRequestConfig
): IUseAxios<T> => {
  const [response, setResponse] = useState<AxiosResponse<T>>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(true);

  const axiosInstance: AxiosInstance = axios.create(options);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get(url);
        setResponse(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance, url]);

  return { response, error, isLoading };
};

export default useAxios;
