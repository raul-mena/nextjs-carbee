import { ApiResponse } from "@/types";
import { apiCall } from "../Utils/ApiCall";

export const checkAvailability = async (date: string): Promise<ApiResponse> => {
  try {
    const { data } = await apiCall({
      url: `/availability/${date}`,
    })

    // return info on standar format
    return {
      data,
      success: true,
    };
  } catch (error: unknown) {
    return {
      data: error,
      message: 'Error on get availavility',
      success: false
    };
  }
}
