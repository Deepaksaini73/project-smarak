import { useState } from 'react';
import axios from 'axios';
import { handleSuccess, handleError, ApiResponse } from '@/lib/api-handlers';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const makeRequest = async <T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: any,
    errorMessage: string = 'Request failed',
    showToast: boolean = method !== 'GET'
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true);

    const API_URL = `/api`;
    const url = `${API_URL}${endpoint}`;

    try {
      const response = await axios.request({
        method,
        url,
        data,
      });
      return handleSuccess<T>(response, undefined, showToast);
    } catch (error) {
      return handleError(error, errorMessage, showToast) as ApiResponse<T>;
    } finally {
      setIsLoading(false);
    }
  };

  return { makeRequest, isLoading };
};
