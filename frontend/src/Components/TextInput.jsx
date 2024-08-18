

export default function TextInput({label, ...props}) {

    return (
        <div className="text-input">
            <div><label htmlFor="input">{label}</label></div>
            <input name="input" {...props}></input>
        </div>
    )
}