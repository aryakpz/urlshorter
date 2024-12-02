import React, { useState } from "react";
import { NavBar } from "./navBar";
import { useBackendFetch } from "./fetchBackendData";
import { DeleteButton } from "./deleteApi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_MAX_VERSION } from "tls";

export const DisplayComponent: React.FC = () => {
    const { backendData, setBackendData } = useBackendFetch();
    const [edit, setEdit] = useState<string | null>(null);
    const [newUrl, seturl] = useState<string>("");

    // Copy to clipboard
    const handleCopy = (shortUrl: string) => {
        navigator.clipboard
            .writeText(shortUrl)  
    };

    // URL editing function 
    const handleEdit = (shortUrl: string, currentUrl: string) => {
        setEdit(shortUrl);
        seturl(currentUrl);
    };
    
    const handleSave = async (shortUrl: string) => {
        try {
            const response = await axios.put(`/api/edit/${shortUrl}`, { url: newUrl }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                setBackendData((prevData) =>
                    prevData && prevData.data
                        ? {
                            ...prevData,
                            data: prevData.data.map((item) =>
                                item.shorturl === shortUrl ? { ...item, url: newUrl } : item
                            ),
                        }
                        : prevData
                );
                setEdit(null);
            }
        } catch (error) {
            console.error("Error updating URL:", error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="show-url">
                <div>
                    <table>
                        <thead>
                            <tr>                                   
                                <th> No: </th>
                                <th>Short URL</th>
                                <th>Main URL</th>
                                <th>Edit</th>
                                <th>Delete</th>         
                            </tr>
                        </thead>
                        <tbody>
                            {backendData &&
                                backendData.data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td className="shorturl">
                                            <span
                                                onClick={() =>
                                                    handleCopy(`http://localhost:5002/api/${item.shorturl}`)
                                                }
                                            >
                                                http://localhost:5002/api/{item.shorturl}
                                            </span>
                                        </td>
                                        <td className="mainurl">
                                            {edit === item.shorturl ? (
                                                <>
                                                    <input
                                                        className="input-edit"
                                                        type="text"
                                                        value={newUrl}
                                                        onChange={(e) => seturl(e.target.value)}
                                                    />
                                                    <button onClick={() => handleSave(item.shorturl)}>Save</button>
                                                </>
                                            ) : (
                                                item.url
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => handleEdit(item.shorturl, item.url)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td><DeleteButton shorturl={item.shorturl} /></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};







