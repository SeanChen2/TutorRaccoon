import ProgressBar from "../Components/ProgressBar";
import TextInput from "../Components/TextInput";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import "../css/Onboarding.css"

export default function Onboarding() {

  document.body.style = "background: white;"

  //Get account info passed from Register
  const {state} = useLocation();
  const {username, email, password} = state;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);  //section index is 0-indexed (i.e. section 1 is saved as 0, section 2 is saved as 1...)

  const questions = [
    {
      sectionNum: 1,
      section: "1. Basic Information",
      questionText: "Let's introduce ourselves",
    },
    {
      sectionNum: 1,
      section: "1. Basic Information",
      questionText: "What university are you currently attending?",
    },
    {
      sectionNum: 1,
      section: "1. Basic Information",
      questionText: "What major are you studying?",
    },
    {
      sectionNum: 1,
      section: "1. Basic Information",
      questionText: "Which course(s) or subject(s) do you need help with?",
    },
    {
      sectionNum: 2,
      section: "2. Learning Preferences",
      questionText: "What type of tutoring sessions are you interested in?",
    },
    {
      sectionNum: 3,
      section: "3. Tutor Preferences",
      questionText: "What are your expectations of your tutor's teaching style?",
    },
    {
      sectionNum: 4,
      section: "4. Scheduling & Availability",
      questionText: "What time of day works best for you?",
    },
    {
      sectionNum: 5,
      section: "5. Budget & Location",
      questionText: "What is your budget for each tutoring session?",
    },
    {
      sectionNum: 5,
      section: "5. Budget & Location",
      questionText: "How far are you willing to travel for in-person tutoring sessions?",
    },
    {
      sectionNum: 6,
      section: "6. Personality & Compatibility",
      questionText: "Would you like to take a short personality quiz to match with a compatible tutor?",
    },
    {
      sectionNum: 7,
      section: "7. Account Info",
      questionText: "Create your profile bio"
    }
  ]

  const navPrev = () => {
    setQuestionIndex(questionIndex - 1)
    setSectionIndex(questions[questionIndex - 1].sectionNum - 1)
  };

  const navNext = () => {
    setQuestionIndex(questionIndex + 1)
    setSectionIndex(questions[questionIndex + 1].sectionNum - 1)
  };
  
  return (
    <div className="question-content">
      <div className="header">
        <h1>{questions[questionIndex].section}</h1>
        <div>{questions[questionIndex].questionText}</div>
      </div>

      {
        questionIndex == 0 && <div className="text-input-container">
          <TextInput label="First name" placeholder="Enter your first name" />
          <TextInput label="Last name" placeholder="Enter your last name" />
        </div>

      }

      <div className="btn-container">
        {questionIndex > 0 && <button className="prev-btn" onClick={navPrev}>Prev</button>}
        {questionIndex < 10 && <button className="next-btn" onClick={navNext}>Next</button>}
      </div>

      <ProgressBar currentIndex={sectionIndex}/>
    </div>
  )
}