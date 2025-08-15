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

interface BackendCartItem {
  service_id?: number;
  id?: number;
  service_name?: string;
  name?: string;
  description?: string;
  service_image_url?: string;
  image_url?: string;
  service_type_name?: string;
  service_type_description?: string;
  service_type_image_url?: string;
  price?: string | number;
  offerPrice?: string | number;
  service_type_id?: number;
  type_id?: number;
  duration_minutes?: number;
}

export const getCartItemsAction =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const { cart } = getState();
    if (cart.isLoaded) return;

    try {
      const { userDetails } = getState().user;
      const payload = {
        headers: {
          user_id: userDetails?.user_id ? String(userDetails.user_id) : "",
        },
      };

      const response = await get(apiEndpoints.GET_CART_ITEMS, payload);

      if (response?.status === 200 && Array.isArray(response.data.data)) {
        const normalizedData: ServiceItem[] = response.data.data.map(
          (item: BackendCartItem) => ({
            service_id: item.service_id ?? item.id,
            service_name: item.service_name ?? item.name ?? "",
            description: item.description ?? "",
            service_image_url: item.service_image_url ?? item.image_url ?? "",
            service_type_name: item.service_type_name ?? "",
            service_type_description: item.service_type_description ?? "",
            service_type_image_url: item.service_type_image_url ?? "",
            price: String(item.price ?? "0"),
            offerPrice: String(item.offerPrice ?? item.price ?? "0"),
            service_type_id: item.service_type_id ?? item.type_id ?? 0,
            duration_minutes: item.duration_minutes ?? 0,
          })
        );

        dispatch(getCartItems(normalizedData));
        dispatch(setIsLoaded(true));
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      throw error;
    }
  };

export const addToCartAction =
  (item: ServiceItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { userDetails } = getState().user;
      if (!userDetails) {
        throw new Error("User details not found");
      }
      const payload = {
        user_id: userDetails.user_id ?? "",
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
