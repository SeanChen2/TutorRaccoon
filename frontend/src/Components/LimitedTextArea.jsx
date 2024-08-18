import "../css/Onboarding.css";
import { useState } from "react";

export default function LimitedTextArea({placeholder, charLimit, ...props}) {

    const [text, setText] = useState("");
    const [charsLeft, setCharsLeft] = useState(charLimit);

    const handleClick = e => {
        setText(e.target.value);
        setCharsLeft(charLimit - e.target.value.length);
    };

    return (
        <div className="bio-container">
            <textarea 
                className="bio-text-area" 
                placeholder={placeholder} 
                maxLength={charLimit} 
                onChange={e => handleClick(e)}
                {...props}
            />

            <div className="bio-chars-left">{charsLeft} characters left</div>
        </div>
    )
}