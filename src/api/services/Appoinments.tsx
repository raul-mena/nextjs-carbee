import { AppoinmentModal } from "@/interfaces/Appoinment";
import { ApiResponse } from "@/types";
import { apiCall } from "../Utils/ApiCall";

/**
 * 
 * @param nextCursor 
 * @param prevCursor 
 * @returns 
 */
export const getAppoinments = async (
  after?: string,
  before?: string,
  pageSize: number = 10
): Promise<ApiResponse> => {
  try {
    const { data } = await apiCall({
      url:'/appointments',
      params: {
        size: pageSize,
        ...(after && { after }),
        ...(before && { before }),
      }
    })
    // get appoinments
    const appoinments = data?.edges?.map(
      (appointment: AppoinmentModal) => ({...appointment})
    );
    // return info on standar format
    return {
      data: {
        appoinments,
        pageInfo: data.pageInfo
      },
      success: true,
    };
  } catch (error: unknown) {
    return {
      data: error,
      message: 'Error on get appoints',
      success: false
    };
  }
}
