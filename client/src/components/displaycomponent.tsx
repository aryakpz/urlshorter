
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
                                <th> no: </th>
                                <th>Main URL</th>
                                {/* <th>key</th> */}
                                <th>Short URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {backendData &&
                                backendData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td className="mainurl" ><a href={`${item.url}`}>{item.url}</a></td>
                                         {/* <td>{item.id}</td> */}
                                        <td className="shorturl"><a  href={`http://localhost:5002/api/${item.shorturl}`}>http://localhost:5002/api/{item.shorturl}</a></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}