import { AUTH_TOKEN_KEY } from "@/global/constants"
import axios, { AxiosRequestConfig } from "axios"

/**
 * 
 * @param params 
 * @returns 
 */
export const apiCall = async (params: AxiosRequestConfig) => {
  // init default values
  const { method = 'GET', headers = {} } = params;
  return axios({
    ...params,
    method,
    headers: {
      ...(headers),
      // adding basic authorization for all request
      Authorization: `Bearer ${sessionStorage.getItem(AUTH_TOKEN_KEY)}`
    }
  });
}