

export default function TutorCard({pfp, firstName, lastName, session, distance, institution, major, subjects, ...props}) {

    return (
        <div className="tutor-card" {...props}>
            <div className="tutor-pfp"><img src={pfp} height="200" width="313"/></div>

            <div>
                <div className="tutor-name">{firstName + " " + lastName}</div>
                <div className="info-tags">
                    <div className="info-tag">
                        <img src="../icons/distance_icon.svg" /> <span>{distance} km away</span>
                    </div>
                    <div className="info-tag">
                        <img src="../icons/major_icon.svg" width="27"/> <span>{institution}</span>
                    </div>
                    <div className="info-tag">
                        <img src="../icons/subjects_icon.svg" /> <span>{major + " Major"}</span>
                    </div>
                </div>

                <div className="subject-row">
                    {
                        subjects.map((subject, index) => (
                            <div className="subject-box" key={index}>{subject}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}