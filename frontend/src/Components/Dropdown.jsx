

export default function Dropdown({placeholder, options, ...props}) {

    return (
        <select name="school" className="school-dropdown" {...props}>
            <option value="" disabled selected>{placeholder}</option>
            {
                options.map((optionName, index) => (
                    <option value={optionName} key={index}>{optionName}</option>
                ))
            }
        </select>
    )
}