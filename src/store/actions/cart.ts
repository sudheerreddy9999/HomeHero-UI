import {addToCartReducer} from "../reducers/cart";
import { AppDispatch } from "../config/store";
import {ACService} from "@/Jsons/acServives";

export const addToCartAction = (item:ACService) => async (dispatch: AppDispatch) => {
    try {
        console.log("Adding item to cart:", item);
        dispatch(addToCartReducer(item));
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
}
