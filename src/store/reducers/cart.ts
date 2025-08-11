import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceItem } from "@/types/serviceTypes";

const TAX_RATE = 0.18;

const initialState = {
  cartItems: [] as ServiceItem[],
  totalAmount: 0,
  subtotal: 0,
  taxAmount: 0,
  totalQuantity: 0,
};

const calculateTotals = (state: typeof initialState) => {
  let subtotal = 0;
  let totalQuantity = 0;

  state.cartItems.forEach((item) => {
    subtotal += Number(item.offerPrice);
    totalQuantity += 1;
  });

  const taxAmount = parseFloat((subtotal * TAX_RATE).toFixed(2));
  const totalAmount = parseFloat((subtotal + taxAmount).toFixed(2));

  state.subtotal = parseFloat(subtotal.toFixed(2));
  state.taxAmount = taxAmount;
  state.totalAmount = totalAmount;
  state.totalQuantity = totalQuantity;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartReducer: (state, action: PayloadAction<ServiceItem>) => {
      if (
        state.cartItems.some(
          (item: ServiceItem) =>
            item.service_type_id === action.payload.service_type_id
        )
      ) {
        console.warn(
          `Item with id ${action.payload.service_type_id} is already in the cart.`
        );
        return;
      } else {
        state.cartItems.push(action.payload);
        calculateTotals(state);
      }
    },
    removeItemReducer: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item: ServiceItem) => item.service_type_id !== Number(action.payload)
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
