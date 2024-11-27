import React, { useState } from "react";
import { NavBar } from "./navBar";
import { useBackendFetch } from "./fetchBackendData";
import { DeleteButton } from "./deleteApi";

export const DisplayComponent: React.FC = () => {
    const { backendData, setBackendData } = useBackendFetch();
    const [edit, setEdit] = useState<string | null>(null)
    const [newUrl, seturl] = useState<string>("")
    const [alertm, setAlert] = useState<string | null>(null)

    const handleCopy = (shortUrl: string) => {
        navigator.clipboard
            .writeText(shortUrl)
            .then(() => {
                console.log(alertm)
                setAlert("copied")
                setTimeout(() => setAlert(null), 2000)
            })
            .catch(err => console.error("failed to copy the url"))
    }

  // editing function
  const handleEdit = (shortUrl: string, url: string) => {
    setEdit(shortUrl);
    seturl(url); 
};
//  save after editing
const handleSave = (shortUrl: string) => {
    console.log("Updated URL for", shortUrl, ":", newUrl);

        setBackendData((prevData) =>
            prevData.map((item) =>
                item.shorturl === shortUrl ? { ...item, url: newUrl } : item
            )
        );
        setEdit(null); 
    
};


    return (
        <div>
            <NavBar />
            <div className="show-url">
                <div >
                    <table>
                        <thead>
                            <tr>
                                <th> no: </th>
                                <th>Short URL</th>
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
                                        <td className="mainurl">
                                            {edit === item.shorturl ? (
                                                <>
                                                    <input  className="input-edit"
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

                                        <td><button onClick={() => handleEdit(item.shorturl, item.url)}>Edit</button></td>
                                        <td><DeleteButton shorturl={item.shorturl} /></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}