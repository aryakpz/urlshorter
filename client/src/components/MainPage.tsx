

import React, { useState } from "react";
import { useBackendFetch } from "./fetchBackendData";
import { urlProps } from "../type/types";
import { NavBar } from "./navBar";

export const MainPage: React.FC = () => {
    const [length, setLength] = useState<number>(0);
    const [url, setUrl] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const value = e.target.value;

        if (id === "url") {
            setUrl(value);
        } else if (id === "length") {
            const inputLength = Number(value);
            if (!isNaN(inputLength)) {
                setLength(inputLength);
            }
        }    
    };

    const handleClick = async () => {
        const datasec = { url, length };

        try {
            const response = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datasec),
            });
            if (!response.ok) {
                throw new Error("Failed to add data to the database.");
            }
            const result = await response.json();
            console.log("Data added successfully:", result);

          
            setUrl("");
            setLength(0);

        } catch (error) {
            console.error("Error submitting data:", error);
        }
       
    };

    return (
        <>
            <NavBar />
            <div className="mainsection">

                <h2>Short URL</h2>
                <div className="url-generate">
                    <div className="url-enter">
                        <input
                            type="text"
                            placeholder="Enter the link here"
                            value={url}
                            onChange={(e) => handleChange(e, "url")}
                        />
                    </div>
                    <div className="length-enter">
                        <input
                            type="number"
                            value={length || ''}
                            placeholder="Enter the Length here "
                            onChange={(e) => handleChange(e, "length")}
                        />
                    </div>
                    <div className="generate-button">
                        <button onClick={handleClick}> Generate URL</button>
                    </div>
                </div>
            </div>
        </>
    );
};
