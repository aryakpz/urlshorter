import React, { useState } from "react";
import { useBackendFetch } from "./fetchBackendData";

export const MainPage: React.FC = () => {
    const { backendData } = useBackendFetch();
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
    const handleshow = () => {          
        console.log(backendData)
    }
    const handleClick = async () => {
        console.log("Length:", length);
        console.log("URL:", url);

        const data = { url, length };

        try {
            const response = await fetch("/api//add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to add data to the database.");
            }

            const result = await response.json();
            console.log("Data added successfully:", result);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div>
            <div>
                <label>Enter the URL: </label>
                <input
                    type="text"
                    placeholder="Enter the URL"
                    onChange={(e) => handleChange(e, "url")}
                />
            </div>
            <div>
                <label>Enter the Length: </label>
                <input
                    type="number"
                    placeholder="Enter Length"
                    onChange={(e) => handleChange(e, "length")}
                />
            </div>
            <div>
                <button onClick={handleClick}>Shorten URL</button>
            </div>
            <div>
                <button onClick={handleshow}>show urls</button>
                <div>
                    {backendData.map((item)=>(
                       <li>{ item.url} </li>
                    ))}
                </div>
            </div>
        </div>
    );
};
