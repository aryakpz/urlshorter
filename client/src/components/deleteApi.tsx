import React from "react";
import axios from "axios";
import { useBackendFetch } from "./fetchBackendData";

type DeleteProps={
    shorturl:string
}

export const DeleteButton:React.FC<DeleteProps>=({shorturl})=>{
    const {setBackendData}=useBackendFetch()
    const handleDelete=()=>{
        console.log(shorturl)
        axios.delete(`/api/delete/${shorturl}`,
            {method:'DELETE'})
            .then(response =>{
                    setBackendData((prevData) =>
                        prevData.filter((item) => item.shorturl !== shorturl) 
                      );
            })
        .catch(error =>console.log('Error:',error))
    }
    return(
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}