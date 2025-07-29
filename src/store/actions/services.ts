import { AppDispatch } from "../config/store";
import {getServicesReducer} from "../reducers/services";
import { apiEndpoints } from "@/utils/apiEndpoints";
import {get} from "@/utils/constants";

export const  getServicesAction = ()=>async(dispatch:AppDispatch)=>{
    try {
        const response = await get(apiEndpoints.GET_SERVICES);
        if(response?.status ===200){
            dispatch(getServicesReducer(response.data.data))
        }
        console.log(response)
        
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }
    }
}