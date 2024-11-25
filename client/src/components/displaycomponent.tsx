
import React from "react";
import { NavBar } from "./navBar";
import { useBackendFetch } from "./fetchBackendData";

export const DisplayComponent: React.FC = () => {
    const { backendData } = useBackendFetch();

    return (
        <div>
            <NavBar />
            <div className="show-url">
                <div >
                    <table>
                        <thead>
                            <tr>
                                <th>Main URL</th>
                                <th>Short URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backendData &&
                                backendData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.url}</td>
                                        <td>{`http://shortnerurl/${item.shorturl}`}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}