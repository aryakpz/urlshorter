import React, { useState } from "react";
import { NavBar } from "./navBar";
import axios from "axios";

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
             await axios.post("/api/add", datasec, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Data added successfully");
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
                            max="23"
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
