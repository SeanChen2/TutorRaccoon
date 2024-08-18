import "../css/Home.css";
import { useState } from "react";
import { HomeContext } from "../pages/Home";

export default function SearchBar({...props}) {

    return (
        <div className="search-bar-container">
            <input className="search-bar" type="search" {...props} />
        </div>
    )
}