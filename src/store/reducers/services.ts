import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  services: [],
  serviceLoading: true,
  categoryItems: [],
  trending:[],
  serviceSerachItems:[],
  searchLoading: false,
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
    getTrendingItems:(state,action)=>{
      state.trending=action.payload;
    },
    getServiceSearchItems:(state,action)=>{
      state.serviceSerachItems=action.payload
    },
    setSearchLoading: (state, action) => {
      state.searchLoading = action.payload;
    },
  },
});

export const {
  getServicesReducer,
  getCategoryReducer,
  fetchStart,
  fetchFailure,
  getTrendingItems,
  getServiceSearchItems,
  setSearchLoading
} = servicesSlice.actions;
export default servicesSlice.reducer;
