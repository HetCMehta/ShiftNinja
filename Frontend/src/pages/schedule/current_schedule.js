import axios from "axios";
import React, { useEffect } from "react";
import { API_URLS } from "../../apiConfig";

const CurrentSchedule = ()=>{

    useEffect(()=>{
        axios.get(API_URLS.schedule).then((res)=>{
            console.log(res);
        }, (error)=>{
            console.error(error);
        });
    },[])
    return(<><h1>working</h1></>)
}

export default CurrentSchedule;