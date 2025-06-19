import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACService } from "@/Jsons/acServives";

const initialState = {
  cartItems: [] as ACService[],
  totalAmount: 0,
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartReducer: (state, action: PayloadAction<ACService>) => {
      state.cartItems.push(action.payload);
    },
  },
});

export const { addToCartReducer } = cartSlice.actions;

export default cartSlice.reducer;
