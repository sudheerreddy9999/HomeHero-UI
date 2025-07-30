import {addToCartReducer,removeItemReducer} from "../reducers/cart";
import { AppDispatch } from "../config/store";
import { ServiceItem } from "@/types/serviceTypes";

export const addToCartAction = (item:ServiceItem) => async (dispatch: AppDispatch) => {
    try {
        dispatch(addToCartReducer(item));
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw error;
    }
}

export const removeItemFromCart = (item: string | number)=>async(dispatch:AppDispatch)=>{
    try {
        dispatch(removeItemReducer(item));
    } catch (error) {
        console.error(error);
        throw error;
    }
}
