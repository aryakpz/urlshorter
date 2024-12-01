
import React, { useEffect, useState } from "react";
import { urlProps } from "../type/types";

export const useBackendFetch = () => {
    const [backendData, setBackendData] = useState<urlProps | []>([]);
    // console.log( backendData)

    useEffect(() => {
        fetch("/api/display").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data);
            }
        );
    }, []);
    // console.log(backendData)
    return { backendData,setBackendData }
}

