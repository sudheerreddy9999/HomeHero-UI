import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    count: 0,
    userDetails:null,
    otpSentSuccessfully :false,
    loginSuccess:false,
    invalidOtp:false,
    resendotp:false
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
            console.log("Helo I ajaaaaaaaaaaaaaaaaa jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj(((((((((((((((((((((((((((((((((((((((")
            state.invalidOtp = action.payload.status;
        }
    }
})

export const {getIncreaseCountValue,getOtpSendSuccessfully,getInvalidOtp} = authSlice.actions;

export default authSlice.reducer;
