import {
  getServicesReducer,
  getCategoryReducer,
  getTrendingItems,
  getServiceSearchItems,
} from "../reducers/services";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { get } from "@/utils/constants";
import { handleApiCall } from "@/utils/apiHandler";
import { AppDispatch } from "../config/store";
import { GetCategoryItemsType } from "@/types/serviceTypes";
import { GetServiceSearch } from "@/types/serviceTypes";

export const getServicesAction = () => async (dispatch: AppDispatch) => {
  await handleApiCall(
    dispatch,
    () => get(apiEndpoints.GET_SERVICES),
    (data) => dispatch(getServicesReducer(data))
  );
};

export const getCategoryItemsAction =
  (payload: GetCategoryItemsType) => async (dispatch: AppDispatch) => {
    await handleApiCall(
      dispatch,
      () => get(apiEndpoints.SEARCH_SERVICES, payload),
      (data) => dispatch(getCategoryReducer(data))
    );
  };

export const getTrendingServices = () => async (dispatch: AppDispatch) => {
  await handleApiCall(
    dispatch,
    () => get(apiEndpoints.TRENDING_SERVICES),
    (data) => dispatch(getTrendingItems(data)),
    false
  );
};

export const getSearchServiceItems =
  (payload: GetServiceSearch) => async (dispatch: AppDispatch) => {
    await handleApiCall(
      dispatch,
      () => get(apiEndpoints.SEARCH_SERVICES, payload),
      (data) => dispatch(getServiceSearchItems(data))
    );
  };
