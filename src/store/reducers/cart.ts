import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServiceItem, CartPost } from "@/types/serviceTypes";

const TAX_RATE = 0.18;

const initialState = {
  cartItems: [] as ServiceItem[],
  totalAmount: 0,
  subtotal: 0,
  taxAmount: 0,
  totalQuantity: 0,
  isLoaded: false,
};

const calculateTotals = (state: typeof initialState) => {
  let subtotal = 0;
  const totalQuantity = state.cartItems.length;

  state.cartItems.forEach((item) => {
    subtotal += Number(item.offerPrice || 0);
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
    getCartItems: (state, action) => {
      const payloadArray = Array.isArray(action.payload) ? action.payload : [];
      state.cartItems = payloadArray as ServiceItem[];
      calculateTotals(state);
    },
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
    addToCartReducer: (state, action: PayloadAction<ServiceItem>) => {
      if (
        state.cartItems.some(
          (item) => item.service_type_id === action.payload.service_type_id
        )
      ) {
        console.warn(
          `Item with id ${action.payload.service_id} is already in the cart.`
        );
        return;
      }
      state.cartItems.push(action.payload);
      calculateTotals(state);
    },
    removeItemReducer: (state, action: PayloadAction<CartPost>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.service_type_id !== Number(action.payload.service_id)
      );
      calculateTotals(state);
    },
    caliculateTotals: (state) => {
      calculateTotals(state);
    },
  },
});

export const {
  addToCartReducer,
  removeItemReducer,
  caliculateTotals,
  getCartItems,
  setIsLoaded,
} = cartSlice.actions;

export default cartSlice.reducer;
