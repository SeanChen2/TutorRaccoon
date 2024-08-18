import ProgressBar from "../Components/ProgressBar";
import TextInput from "../Components/TextInput";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/Onboarding.css";
import Dropdown from "../Components/Dropdown";
import BigButton from "../Components/BigButton";
import LimitedTextArea from "../Components/LimitedTextArea";

const schoolOptions = [
  "None",
  "University of Toronto",
  "University of Waterloo",
  "McMaster University",
  "Western University",
  "University of Ottawa",
]

const majorOptions = [
  "None",
  "Engineering",
  "Business",
  "Computer Science",
  "Psychology",
  "Music",
]

export const subjectOptions = [
  "None",
  "Engineering",
  "Business",
  "Computer Science",
  "Psychology",
  "Music",
]

export const styleOptions = [
  "None",
  "Structured & Organized",
  "Flexible & Adaptive",
  "Casual & Relaxed",
  "Goal-Oriented & Focused",
]

export const sessionOptions = [
  "In-Person",
  "Virtual",
  "Hybrid",
]

export const availabilityOptions = [
  "Morning",
  "Afternoon",
  "Evening",
  "Night",
]

const budgetOptions = [
  "$20 per hour",
  "$35 per hour",
  "$45 per hour",
  "$60 per hour",
]

export const distanceOptions = [
  "5 km",
  "10 km",
  "15 km",
  "25 km",
  "50 km",
  "100 km",
]

// const styleOptions = [
//   { value:"N/A", label: "None" },
//   { value:"structured & organized", label: "Structured & Organized" },
//   { value:"flexible & adaptive", label: "Flexible & Adaptive" },
//   { value:"casual & relaxed", label: "Casual & Relaxed" },
//   { value:"goal-oriented & focused", label: "Goal-Oriented & Focused" },
// ]

export default function Onboarding() {

  document.body.style = "background: white;"

  //Get account info passed from Register
  const {state} = useLocation();
  const {username, email, password} = state;

  const navigate = useNavigate();

  const [questionIndex, setQuestionIndex] = useState(0);
  const [sectionIndex, setSectionIndex] = useState(0);  //section index is 0-indexed (i.e. section 1 is saved as 0, section 2 is saved as 1...)

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [session, setSession] = useState(null);
  const [style, setStyle] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [budget, setBudget] = useState(null);
  const [zip, setZip] = useState(null);
  const [distance, setDistance] = useState(null);
  const [bio, setBio] = useState(null);

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
      questionText: "Please enter your ZIP code",
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
    if (questionIndex >= questions.length - 1) {
      var biography = document.getElementById('bio-area').textContent;
      navigate("/home", { state: { username, email, password, firstName, lastName, school, subjects, style, session, availability, zip, budget, biography } });
      return;
    }
  
    setQuestionIndex(questionIndex + 1);
    setSectionIndex(questions[questionIndex + 1].sectionNum - 1);
  };
  
  return (
    <div className="question-content">
      <div className="header">
        <h1>{questions[questionIndex].section}</h1>
        <div>{questions[questionIndex].questionText}</div>
      </div>

      {
        questionIndex == 0 ? <div className="text-input-container">
          <TextInput label="First name" placeholder="Enter your first name" onChange={e => setFirstName(e.target.value)}/>
          <TextInput label="Last name" placeholder="Enter your last name" onChange={e => setLastName(e.target.value)}/>
        </div>

        : questionIndex == 1 ? <div>
          <Dropdown 
            placeholder="Select School"
            options={schoolOptions}
            onChange={e => setSchool(e.target.value)}
          />
        </div>

        : questionIndex == 2 ? <div>
          <Dropdown 
            placeholder="Select Major"
            options={majorOptions}
            onChange={e => setMajor(e.target.value)}
          />
        </div>

        : questionIndex == 3 ? <div>
          <Dropdown 
            placeholder="Select course or subject name"
            options={subjectOptions}
            onChange={e => setSubjects(e.target.value)}
          />
        </div>

        : questionIndex == 4 ? <div className="session-container">
          <BigButton icon="../icons/inperson_icon.svg" className="big-button" onClick={() => setSession("In-Person")}>In-person</BigButton>
          <BigButton icon="../icons/virtual_icon.svg" className="big-button" onClick={() => setSession("Virtual")}>Virtual</BigButton>
          <BigButton icon="../icons/hybrid_icon.svg" className="big-button" onClick={() => setSession("Hybrid")}>Hybrid</BigButton>
        </div>

        : questionIndex == 5 ? <div>
          <Dropdown 
            placeholder="Select teaching style"
            options={styleOptions}
            onChange={e => setStyle(e.target.value)}
          />
        </div>

        : questionIndex == 6 ? <div className="availability-container-rows">
          <div className="availability-container-cols">
            <BigButton icon="../icons/morning_icon.svg" className="long-button" onClick={() => setAvailability("Morning")}>Morning</BigButton>
            <BigButton icon="../icons/afternoon_icon.svg" className="long-button" onClick={() => setAvailability("Afternoon")}>Afternoon</BigButton>
          </div>
          <div className="availability-container-cols">
            <BigButton icon="../icons/evening_icon.svg" className="long-button" onClick={() => setAvailability("Evening")}>Evening</BigButton>
            <BigButton icon="../icons/night_icon.svg" className="long-button" onClick={() => setAvailability("Night")}>Night</BigButton>
          </div>
        </div>

        : questionIndex == 7 ? <div>
          <Dropdown 
            placeholder="Select maximum budget"
            options={budgetOptions}
            onChange={e => setBudget(e.target.value)}
          />
        </div>

        : questionIndex == 8 ? <div>
          <TextInput label="ZIP Code" placeholder="Enter your ZIP code" onChange={e => setZip(e.target.value)} maxLength={6}/>
        </div>

        : questionIndex == 9 ? <div>
          <Dropdown 
            placeholder="Select maximum distance"
            options={distanceOptions}
            onChange={e => setDistance(e.target.value)}
          />
        </div>

        : questionIndex == 10 ? <div className="personality-container">
          <BigButton icon="../icons/yes_icon.svg" className="xl-button" >Yes, I want to find the best match!</BigButton>
          <BigButton icon="../icons/no_icon.svg" className="xl-button" >No thanks, I'll choose a tutor myself.</BigButton>
        </div>

        : questionIndex == 11 ? <LimitedTextArea
          placeholder="Enter biography"
          charLimit={200}
          id="bio-area"
          //Exception: handle the text submission in the very end (navNext)
        />

        : <div>ERROR: onboarding page out of range</div>
      }

      <div className="btn-container">
        {questionIndex > 0 && <button className="prev-btn" onClick={navPrev}>Prev</button>}
        <button className="next-btn" onClick={navNext}>{questionIndex < questions.length - 1 ? "Next" : "Finish"}</button>
      </div>

      <ProgressBar currentIndex={sectionIndex}/>
    </div>
  )
}