import "../css/Onboarding.css"

export default function ProgressBar({currentIndex}) {

    return (
        <div className="progress-bar">
            {
                [...Array(7)].map((x, index) => (
                    <div key={index} className={currentIndex == index ? "current-bar" : "other-bar"} />
                ))
            }
        </div>
    )
}