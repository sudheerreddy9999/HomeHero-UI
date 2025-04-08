import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    count: 0,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        getIncreaseCountValue:(state)=>{
            state.count += 1;
        }
    }
})

export const {getIncreaseCountValue} = authSlice.actions;

export default authSlice.reducer;
