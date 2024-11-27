import React from "react";
import { NavLink } from "react-router-dom";


export const NavBar:React.FC=()=>{

return(
    <div className="navsection">
        <nav>
             <NavLink to={'/'}>Home</NavLink>
             <NavLink to={'/display'}>Show URL</NavLink>
        </nav>

    </div>
)
}