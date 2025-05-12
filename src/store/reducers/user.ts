import { createSlice } from "@reduxjs/toolkit";
import { UserDetailsType } from "@/types/user";

interface userState {
    userDetails:UserDetailsType|null;
    isLoading:boolean;
}

const initialState:userState = {
    userDetails:null,
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
        getUserDetailsError: (state) => {
            state.userDetails = null;
            state.isLoading=false;
        }
    },
})

export const { getUserDetails,getUserDetailsError } = userSlice.actions;
export default userSlice.reducer;
