import "../css/Onboarding.css";
import { useState } from "react";

export default function LimitedTextArea({placeholder, charLimit}) {

    const [charsLeft, setCharsLeft] = useState(charLimit);

    const handleChange = e => {
        
    }

    return (
        <div>
            <textarea 
                className="bio-text-area" 
                placeholder={placeholder} 
                maxLength={charLimit} 
                onChange={e => setCharsLeft(charLimit - e.target.value.length)}
            />

            <div className="bio-chars-left">{charsLeft} characters left</div>
        </div>
    )
}