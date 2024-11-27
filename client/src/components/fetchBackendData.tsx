
import React, { useEffect, useState } from "react";
import axios from "axios";
import { urlProps } from "../type/types";

export const useBackendFetch = () => {
    const [backendData, setBackendData] = useState<urlProps | []>([]);

    useEffect(() => {
        axios.get("/api/display")
        .then(response=>{
            setBackendData(response.data)
        })
        .catch(err =>console.error(err));
        
    }, [backendData,setBackendData]);

    return { backendData,setBackendData }
}

