

export default function Dropdown({placeholder, options}) {

    return (
        <select name="school" className="school-dropdown">
            <option value="" disabled selected>{placeholder}</option>
            {
                options.map((optionName, index) => (
                    <option value={optionName} key={index}>{optionName}</option>
                ))
            }
        </select>
    )
}