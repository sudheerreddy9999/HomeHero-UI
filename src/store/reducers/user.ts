import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        getUserDetailsError: (state, action) => {
            state.userDetails = null;
        }
    },
})

export const { getUserDetails,getUserDetailsError } = userSlice.actions;
export default userSlice.reducer;
