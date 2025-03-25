import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { handleSuccess, handleError, ApiResponse } from '@/lib/api-handlers';

export const useApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeRequest = async <T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: any,
    errorMessage: string = 'Request failed',
    tokenReq: boolean = false,
    showToast: boolean = true
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true);

    const API_URL = `/api`;
    const url = `${API_URL}${endpoint}`;
    const token = '';

    if (tokenReq && !token) {
      if (showToast) toast.error('Please login again to continue!');
      setIsLoading(false);
      return {
        status: 'error',
        data: null,
        message: 'Authentication required',
      };
    }

    const headers: AxiosRequestConfig['headers'] = {
      'Content-Type': 'application/json',
      ...(tokenReq && { Authorization: `Bearer ${token ? token : ''}` }),
    };

    try {
      const response = await axios.request({
        method,
        url,
        data,
        headers,
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
