import Cookies from "js-cookie";
import {getUserDetails,getUserDetailsError} from "../reducers/user";
import {get} from "../../utils/constants";
import {apiEndpoints} from "../../utils/apiEndpoints";
import { AppDispatch } from "../config/store";


export const userDetailsAction = ()=> async(dispatch:AppDispatch)=>{
    try {
        const token = Cookies.get("token"); 
        if(!token){
            return dispatch(getUserDetailsError())
        }
        const response =await get(apiEndpoints.USER_DETAILS);
        if(response &&response.status === 200){
            dispatch(getUserDetails(response.data.data[0]));
        }else{
            dispatch(getUserDetailsError());
        }
    } catch (error:unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Unexpected error", error);
          }
    }
}


export const handleUserLogout = () => {
    return () => {
      Cookies.remove("token");
      localStorage.removeItem("email");
      location.reload();
    };
  };