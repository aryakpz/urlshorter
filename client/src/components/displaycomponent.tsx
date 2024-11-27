import React, { useState } from "react";
import { NavBar } from "./navBar";
import { useBackendFetch } from "./fetchBackendData";
import { DeleteButton } from "./deleteApi";
import { EditButton } from "./editApi";

export const DisplayComponent: React.FC = () => {
    const { backendData } = useBackendFetch();
    const [alertm,setAlert]=useState<string |null>(null)
    
    const handleCopy=(shortUrl:string)=>{
        navigator.clipboard
        .writeText(shortUrl)
        .then(()=>{
            // alert("copied")
            console.log(alertm)
            setAlert("copied")
            setTimeout(()=>setAlert(null),2000)
        })
        .catch(err =>console.error("failed to copy the url"))
    }

    return (
        <div>
            <NavBar />
            <div className="show-url">
                <div >
                    <table>
                        <thead>
                            <tr>
                                <th> no: </th>
                                <th>
                                    Short URL</th>
                                {/* <th>key</th> */}
                                <th>Main URL</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backendData &&
                                backendData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                     
                                        {/* <td>{item.id}</td> */}
                                        <td className="shorturl">
                                            <span onClick={() => handleCopy(`http://localhost:5002/api/${item.shorturl}`)}>
                                                http://localhost:5002/api/{item.shorturl}
                                            </span>
                                           {alertm && (
                                                <div className="custom-alert">
                                                    <p>{alertm}</p>
                                                </div>
                                            )}       
                                        </td>
                                        <td className="mainurl" >{item.url}</td>
                                        
                                        <td><EditButton  /></td>
                                        <td><DeleteButton/></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}