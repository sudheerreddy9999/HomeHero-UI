import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACService } from "@/Jsons/acServives";

const TAX_RATE = 0.18;

const initialState = {
  cartItems: [] as ACService[],
  totalAmount: 0,
  subtotal: 0,
  taxAmount: 0,
  totalQuantity: 0,
};

const calculateTotals = (state: typeof initialState) => {
  let subtotal = 0;
  let totalQuantity = 0;

  state.cartItems.forEach((item) => {
    subtotal += item.afterPrice;
    totalQuantity += 1;
  });

  const taxAmount = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const totalAmount = parseFloat((subtotal + taxAmount).toFixed(2));

  state.subtotal = subtotal;
  state.taxAmount = taxAmount;
  state.totalAmount = totalAmount;
  state.totalQuantity = totalQuantity;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartReducer: (state, action: PayloadAction<ACService>) => {
      if (state.cartItems.some((item) => item.id === action.payload.id)) {
        console.warn(
          `Item with id ${action.payload.id} is already in the cart.`
        );
        return;
      } else {
        state.cartItems.push(action.payload);
        calculateTotals(state);
      }
    },
    removeItemReducer: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      calculateTotals(state);
    },
    caliculateTotals: (state) => {
      calculateTotals(state);
    },
  },
});

export const { addToCartReducer, removeItemReducer, caliculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
