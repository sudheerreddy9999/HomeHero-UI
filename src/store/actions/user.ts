import Cookies from "js-cookie";
import {getUserDetails,getUserDetailsError} from "../reducers/user";
import {get} from "../../utils/constants";
import {apiEndpoints} from "../../utils/apiEndpoints";

export const userDetailsAction = ()=> async(dispatch:any)=>{
    try {
        const token = Cookies.get("token"); 
        if(!token){
            return dispatch(getUserDetailsError(null))
        }
        const data =await get(apiEndpoints.USER_DETAILS);
        if(data.status === 200){
            dispatch(getUserDetails(data.data.data[0]));
        }else{
            dispatch(getUserDetailsError(null));
        }
    } catch (error:any) {
        console.log(error.message);
    }
}

export const handleUserLogout = ()=>{
    Cookies.remove("token");
    localStorage.removeItem("email");
    location.reload();
}