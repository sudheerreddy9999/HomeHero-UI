import React, { useEffect } from "react";
import { UseSelector,useDispatch, useSelector } from "react-redux";
import {userDetailsAction} from "@/store/actions/user"
export default function Home() {
    const dispatch:any = useDispatch()
    const {userDetails} = useSelector((state:any)=>state.user);
    useEffect(()=>{
        dispatch(userDetailsAction())
    },[userDetailsAction])
    useEffect(()=>{
        console.log("User details are ",userDetails)
    },[userDetails])
    return(
        <>
        <h1>Hello Sudheer How are you</h1>
        </>
    )
}