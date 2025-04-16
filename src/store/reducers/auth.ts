import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    count: 0,
    userDetails:null,
    otpSentSuccessfully :false,
    resendotp:false
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    
    reducers:{
        getIncreaseCountValue:(state)=>{
            state.count += 1;
        },
        getUserDetails:(state,action)=>{
            state.userDetails = action.payload;
        },
        getOtpSendSuccessfully:(state,action)=>{
            state.otpSentSuccessfully  = action.payload.status;
            state.resendotp = action.payload.resend;
        }
    }
})

export const {getIncreaseCountValue,getUserDetails,getOtpSendSuccessfully} = authSlice.actions;

export default authSlice.reducer;
