import React from "react";
import axios from "axios";
import { useBackendFetch } from "./fetchBackendData";
import { DeleteProps } from "../type/types";

export const DeleteButton: React.FC<DeleteProps> = ({ shorturl }) => {
    const { setBackendData } = useBackendFetch();
    const handleDelete = () => {
        console.log(shorturl);
        axios
            .delete(`/api/delete/${shorturl}`, { method: 'DELETE' })
            .then((response) => {
                setBackendData((prevData) => {
                    if (prevData && prevData.data) {
                        return {
                            ...prevData,
                            data: prevData.data.filter((item) => item.shorturl !== shorturl),
                        };
                    }
                    return prevData;
                });
                alert("Deleted successfully")
                window.location.reload()
            })
            .catch((error) => console.log('Error:', error));
    };
    return (
        <>
            <button onClick={handleDelete}>Delete</button>
        </>
    );
};

