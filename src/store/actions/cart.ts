import {
  addToCartReducer,
  removeItemReducer,
  setIsLoaded,
  getCartItems,
} from "../reducers/cart";
import { AppDispatch, RootState } from "../config/store";
import { apiEndpoints } from "@/utils/apiEndpoints";
import { CartPost, ServiceItem } from "@/types/serviceTypes";
import { post, del, get } from "@/utils/constants";


export const getCartItemsAction =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { cart } = getState();
    if (cart.isLoaded) return;

    try {
      const response = await get(apiEndpoints.GET_CART_ITEMS);
      if (response?.status === 200 && Array.isArray(response.data.data)) {
        dispatch(getCartItems(response.data.data));
        dispatch(setIsLoaded(true));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      throw error;
    }
  };

export const addToCartAction =
  (item: ServiceItem) => async (dispatch: AppDispatch) => {
    try {
      const payload = {
        service_id: item.service_type_id,
      };
      const response = await post(apiEndpoints.ADD_CART_ITEM, payload);
      if (response?.status == 200) {
        dispatch(addToCartReducer(item));
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      throw error;
    }
  };

export const removeItemFromCart =
  (item: CartPost) => async (dispatch: AppDispatch) => {
    try {
      const response = await del(apiEndpoints.DELETE_CART_ITEM, item);
      if (response?.status == 200) {
        dispatch(removeItemReducer(item));
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
