import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null,
    isLoading:true
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserDetails: (state, action) => {
            state.userDetails = action.payload;
            state.isLoading = false;
        },
        getUserDetailsError: (state, action) => {
            state.userDetails = null;
            state.isLoading=false;
        }
    },
})

export const { getUserDetails,getUserDetailsError } = userSlice.actions;
export default userSlice.reducer;
