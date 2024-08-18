import "../css/Home.css";

export default function SearchBar({...props}) {

    return (
        <div className="search-bar-container">
            <input className="search-bar" type="search" {...props} />
        </div>
    )
}