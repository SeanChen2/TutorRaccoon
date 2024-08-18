import { useState, useContext } from "react";
import "../css/TutorModal.css";
import "../css/Home.css";
import { HomeContext } from "../pages/Home";
import TutorInfoCard from "./TutorInfoCard";

export default function TutorModal({pfp, firstName, lastName, session, distance, institution, major, subjects, bio, rate, style, availability}) {

    const [modal, setModal] = useContext(HomeContext);

    const toggleModal = () => {
        setModal(!modal);
        console.log(subjects)
    };

    return (
        <div className="tutor-modal">
            <div className="modal-overlay" onClick={toggleModal}></div>
            <div className="modal-content">
                <button className="close-modal-btn" onClick={toggleModal}>X</button>
                <TutorInfoCard pfp={pfp} firstName={firstName} lastName={lastName} distance={distance} institution={institution} major={major} bio={bio}/>

                <h2>Overview</h2>
                <div className="modal-row-1">
                    <div className="tutor-rate-container">
                        <div><b>Pricing starts</b></div>
                        <div className="tutor-rate">{rate}</div>
                    </div>

                    <div className="tutor-misc-container">
                        <div className="tutor-misc-row">
                            <span><b>Tutor style & Approach</b></span>
                            <span className="float-right">{style}</span>
                        </div>
                        <div className="tutor-misc-row">
                            <span><b>Session Preference</b></span>
                            <span className="float-right">{session}</span>
                        </div>
                        <div className="tutor-misc-row">
                            <span><b>Availability</b></span>
                            <span className="float-right">{availability}</span>
                        </div>
                    </div>
                </div>

                <div className="tutor-subjects-expertise">
                    <span><b>Subjects of expertise</b></span>
                    <div className="modal-subject-row">
                        {
                            subjects.map((subject, index) => (
                                <div className="subject-box" key={index}>{subject}</div>
                            ))
                        }
                    </div>
                </div>

                <button className="book-tutor-btn" onClick={toggleModal}>Book Tutor</button>
            </div>
        </div>
    )
}