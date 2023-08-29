import axios from "axios";
import { ApiResponse } from "../../interfaces/Common";

/**
 * 
 * @param username 
 * @param password 
 * @returns 
 */
export async function login(
  username: string,
  password: string
): Promise<ApiResponse> {
  try {
    // get token from api, and send response based on response standar
    const {data: { token }} = await axios.post('/auth/login', { username, password });
    return {
      data: token,
      message: 'Login Success',
      success: true
    };
  } catch (error: unknown) {
    // any error send default message and error details
    return {
      data: error,
      message: 'Login failed',
      success: true
    };
  }
}

