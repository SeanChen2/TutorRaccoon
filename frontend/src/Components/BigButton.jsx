import "../css/Onboarding.css";

export default function BigButton({icon, children, ...props}) {

    return (
        <div {...props}>
            <img src={icon} />
            <div>{children}</div>
        </div>
    )
}