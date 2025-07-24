import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    count: 0,
    userDetails:null,
    otpSentSuccessfully :false,
    loginSuccess:false,
    invalidOtp:false,
    resendotp:false,
    errorMessage:""
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    
    reducers:{
        getIncreaseCountValue:(state)=>{
            state.count += 1;
        },
        getOtpSendSuccessfully:(state,action)=>{
            state.otpSentSuccessfully  = action.payload.status;
            state.resendotp = action.payload.resend;
        },
        getInvalidOtp:(state,action)=>{
            console.log("Invalid OTP action payload:", action.payload);
            state.invalidOtp = action.payload.status;
            state.errorMessage = action.payload.message || "Invalid OTP";
        }
    }
})

export const {getIncreaseCountValue,getOtpSendSuccessfully,getInvalidOtp} = authSlice.actions;

export default authSlice.reducer;
