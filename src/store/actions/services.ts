import { AppDispatch } from "../config/store";
import {
  getServicesReducer,
  getCategoryReducer,
  fetchStart,
  fetchFailure,
} from "../reducers/services";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { GetCategoryItemsType } from "@/types/serviceTypes";
import { get } from "@/utils/constants";

export const getServicesAction = () => async (dispatch: AppDispatch) => {
  dispatch(fetchStart());
  try {
    const response = await get(apiEndpoints.GET_SERVICES);

    if (response?.status === 200 && response.data?.data) {
      dispatch(getServicesReducer(response.data.data));
    } else {
      const errorMessage = "Failed to fetch services";
      console.error(errorMessage);
      dispatch(fetchFailure(errorMessage));
    }

    console.log(response);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    dispatch(fetchFailure(errorMessage));
  }
};

export const getCategoryItemsAction =
  (payload: GetCategoryItemsType) => async (dispatch: AppDispatch) => {
    dispatch(fetchStart());
    try {
      const response = await get(apiEndpoints.SEARCH_SERVICES, payload);
      if (response?.status === 200) {
        dispatch(getCategoryReducer(response?.data.data));
      } else {
        const errorMessage = "Failed to fetch services";
        console.error(errorMessage);
        dispatch(fetchFailure(errorMessage));
      }
    } catch (error: unknown) {
      let errorMessage = "SomeThing Went Wrong";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      console.error(error);
      dispatch(fetchFailure(errorMessage));
    }
  };
