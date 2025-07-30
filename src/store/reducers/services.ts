import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  services: [],
  serviceLoading: true,
  categoryItems: [],
  error: null as string | null,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.serviceLoading = true;
      state.error = null;
      state.categoryItems=[]
    },
    getServicesReducer: (state, action) => {
      state.services = action.payload;
      state.serviceLoading = false;
    },
    getCategoryReducer: (state, action) => {
      state.categoryItems = action.payload;
    },
    fetchFailure: (state, action) => {
      state.error = action.payload;
      state.serviceLoading = false;
    },
  },
});

export const {
  getServicesReducer,
  getCategoryReducer,
  fetchStart,
  fetchFailure,
} = servicesSlice.actions;
export default servicesSlice.reducer;
