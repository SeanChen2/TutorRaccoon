import React, { useState, useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Dropdown from '../Components/Dropdown'
import { subjectOptions, styleOptions, sessionOptions, availabilityOptions, distanceOptions } from './Onboarding'
import SearchBar from '../Components/SearchBar'
import TutorCard from '../Components/TutorCard'
import TutorModal from '../Components/TutorModal'


const API_DOMAIN = "http://localhost:8080"
/*
ALL ICON LINKS:
<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by Prosymbols Premium - Flaticon</a>
*/

export const HomeContext = React.createContext();

export default function Home() {

  document.body.style = "background: white;"

  // Get account info passed from Register
  const { state } = useLocation();
  const { username, email, password, firstName, lastName, school, subjects, style, session, availability, zip, budget, biography } = state;

  const [courseFilter, setCourseFilter] = useState("");
  const [styleFilter, setStyleFilter] = useState("");

  const [modal, setModal] = useState(false);
  const [tutorIndex, setTutorIndex] = useState(0);

  const [tutors, setTutors] = useState([]);
  const [distance, setDistance] = useState(null);

  const [value, setValue] = useState("")

  let axiosConfig = {
    headers: {
      "Content-Type": 'application/json',
    }
  };

  const ogTutors = [
    {
      "pfp": "../images/person1.jpg",
      "username": "Endphite",
      "firstName": "Sean",
      "lastName": "Chen",
      "institution": "University of Waterloo",
      "major": "Software Engineering",
      "subjects": ["Math", "Computer Science"],
      "style": "Structured & Organized",
      "session": "In-Person",
      "availability": "Evening",
      "zip": "N6L1J9",
      "rate": "$25/hour",
      "bio": "A focused tutor passionate about math and computer science."
    },
    {
      "pfp": "../images/person2.jpg",
      "username": "JaneDoe",
      "firstName": "Jane",
      "lastName": "Doe",
      "institution": "University of Toronto",
      "major": "Science",
      "subjects": ["Science", "Computer Science", "Physics"],
      "style": "Flexible & Adaptive",
      "session": "Virtual",
      "availability": "Afternoon",
      "zip": "N6L1J9",
      "rate": "$30/hour",
      "bio": "Just having fun teaching Science!"
    },
    {
      "pfp": "../images/person3.jpg",
      "username": "JohnDoe",
      "firstName": "John",
      "lastName": "Doe",
      "institution": "McMaster University",
      "major": "Health Science",
      "subjects": ["Science", "Math", "Biology"],
      "style": "Goal-Oriented & Focused",
      "session": "Hybrid",
      "availability": "Morning",
      "zip": "N6L1J9",
      "rate": "$20/hour",
      "bio": "Determined to help my students succeed"
    },
  ]

  // Fetch the backend API info
  const fetchAPI = async () => {
    const postData = {
      institution: school,
      subjects: subjects,
      session: session,
      style: style,
      availability: availability,
      budget: budget,
      max_dist: distance,
      country: "us", // or dynamically capture from the user
      unit: "km" // or "miles", based on preference
    };

    // const post_response = await axios.post(API_DOMAIN + "/api/suggested_tutors", JSON.stringify(postData), axiosConfig);
    // console.log(post_response.data);
    
    //FOR TESTING
    setTutors(ogTutors)
  };

  const toggleModal = index => {
    setModal(!modal);
    setTutorIndex(index);
  };

  //DEMO PURPOSES ONLY
  const filterTutorsByName = (search) => {
    setTutors(ogTutors.filter(tutor => {
      return search == "" || (tutor.firstName + " " + tutor.lastName).includes(search);
    }))
  }

  const filterTutorsByCourse = (course) => {
    setTutors(ogTutors.filter(tutor => {
      return course == "None" || tutor.subjects.includes(course);
    }))
  }

  const filterTutorsByStyle = (reqStyle) => {
    setTutors(ogTutors.filter(tutor => {
      return reqStyle == "None" || tutor.style === reqStyle;
    }))
  }

  const handleSearch = (e) => {
    setValue(e.target.value);
    filterTutorsByName(e.target.value);
  }

  const handleEvent = (e) => {
    setCourseFilter(e.target.value);
    filterTutorsByCourse(e.target.value);
  }

  const handleStyleEvent = (e) => {
    setStyleFilter(e.target.value);
    filterTutorsByStyle(e.target.value);
  }

  // On initial render
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className='home-container'>
      <div className='home-header'>
        <div className='dropdown-container'>
          <Dropdown placeholder="Course" options={subjectOptions} className="search-dropdown" onChange={handleEvent} />
          <Dropdown placeholder="Teaching Style" options={styleOptions} className="search-dropdown" onChange={handleStyleEvent} />
          <Dropdown placeholder="Session" options={sessionOptions} className="search-dropdown" />
          <Dropdown placeholder="Availability" options={availabilityOptions} className="search-dropdown" />
          <Dropdown placeholder="Distance" options={distanceOptions} className="search-dropdown" />
        </div>
        <SearchBar placeholder="Search for tutors..." onChange={handleSearch}/>
      </div>

      {/* <div className="zip-code-input">
        <input 
          type="text" 
          placeholder="Enter ZIP code" 
          value={zip} 
          onChange={(e) => setZipCode(e.target.value)} 
        />
      </div> */}
      
      <div className='heading-container'>
        <h1 className='heading'>Suggested Tutors</h1>
        <div className='subheading'>Meet your match. Expert tutors tailored to your needs.</div>
      </div>

      <div className='tutor-card-container'>
        {
          tutors.map((tutor, index) => (
            
            <TutorCard 
              key={index}
              pfp={tutor.pfp}
              firstName={tutor.firstName}
              lastName={tutor.lastName}
              session={tutor.session}
              distance={25}
              institution={tutor.institution}
              major={tutor.major}
              subjects={tutor.subjects}
              onClick={() => toggleModal(index)}
            />
            
          ))
        }
      </div>

      <HomeContext.Provider value={[modal, setModal]}>
        {modal && <TutorModal 
          pfp={tutors[tutorIndex].pfp}
          firstName={tutors[tutorIndex].firstName}
          lastName={tutors[tutorIndex].lastName}
          session={tutors[tutorIndex].session}
          distance={25}
          institution={tutors[tutorIndex].institution}
          major={tutors[tutorIndex].major}
          subjects={tutors[tutorIndex].subjects}
          bio={tutors[tutorIndex].bio}
          rate={tutors[tutorIndex].rate}
          style={tutors[tutorIndex].style}
          availability={tutors[tutorIndex].availability}
        />}
      </HomeContext.Provider>

    </div>
  )
}
