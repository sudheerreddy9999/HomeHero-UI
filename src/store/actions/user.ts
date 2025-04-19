import Cookies from "js-cookie";
import {getUserDetails,getUserDetailsError} from "../reducers/user";
import {get} from "../../utils/constants";
import {apiEndpoints} from "../../utils/apiEndpoints";

export const userDetailsAction = ()=> async(dispatch:any)=>{
    try {
        const data =await get(apiEndpoints.USER_DETAILS);
        if(data.status === 200){
            dispatch(getUserDetails(data.data));
        }else{
            dispatch(getUserDetailsError(null));
        }
        console.log(data);
    } catch (error:any) {
        console.log(error.message);
    }
}