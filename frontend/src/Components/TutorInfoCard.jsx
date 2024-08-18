

export default function TutorInfoCard({pfp, firstName, lastName, distance, institution, major, bio}) {

    return (
        <div className="tutor-info">
            <div className="tutor-info-pfp"><img src={pfp} width="200" height="200" /></div>

            <div className="tutor-info-content">
                <div className="tutor-info-header">
                    <h2>{firstName + " " + lastName}</h2>
                    <div className="tutor-info-tags-row">
                        <div className="tutor-info-tag">
                            <img src="../icons/distance_icon.svg" /> <span>{distance} km away</span>
                        </div>
                        <div className="tutor-info-tag">
                            <img src="../icons/major_icon.svg" width="27"/> <span>{institution}</span>
                        </div>
                        <div className="tutor-info-tag">
                            <img src="../icons/subjects_icon.svg" /> <span>{major + " Major"}</span>
                        </div>
                    </div>
                </div>

                <p>{bio}</p>
            </div>
        </div>
    )
}