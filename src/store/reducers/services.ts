import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
  loading:true,
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    getServicesReducer: (state, action) => {
      state.services = action.payload;
      state.loading=false
    },
  },
});

export const { getServicesReducer } = servicesSlice.actions;
export default servicesSlice.reducer;
