import "../css/Home.css";

export default function SearchBar({...props}) {

    return (
        <div><input className="search-bar" type="search" {...props} /></div>
    )
}