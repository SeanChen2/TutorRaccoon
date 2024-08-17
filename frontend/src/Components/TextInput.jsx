

export default function TextInput({label, placeholder}) {

    return (
        <div className="text-input">
            <div><label htmlFor="input">{label}</label></div>
            <input name="input" placeholder={placeholder}></input>
        </div>
    )
}