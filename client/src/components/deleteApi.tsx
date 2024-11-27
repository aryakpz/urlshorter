import React from "react";
import { useBackendFetch } from "./fetchBackendData";

type DeleteProps={
    shorturl:string
}

export const DeleteButton:React.FC<DeleteProps>=({shorturl})=>{
    const {setBackendData}=useBackendFetch()
    const handleDelete=()=>{
        console.log(shorturl)
        fetch(`/api/delete/${shorturl}`,
            {method:'DELETE'})
            .then(response =>{
                if(response.ok)
                {
                    console.log("url deleted successfully")
                    setBackendData((prevData) =>
                        prevData.filter((item) => item.shorturl !== shorturl) 
                      );
                }
                else{
                    console.error("Error on deleting")
                }
            })
        .catch(error =>console.log('Error:',error))
    }
    return(
        <>
        <button onClick={handleDelete}>Delete</button>
        </>
    )
}