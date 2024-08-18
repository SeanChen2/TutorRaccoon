import { useState, useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import Dropdown from '../Components/Dropdown'
import { subjectOptions, styleOptions, sessionOptions, availabilityOptions, distanceOptions } from './Onboarding'
import SearchBar from '../Components/SearchBar'

const API_DOMAIN = "http://localhost:8080"
/*
ALL ICON LINKS:
<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by Prosymbols Premium - Flaticon</a>
*/

export default function Home() {

  document.body.style = "background: white;"

  //Get account info passed from Register
  const {state} = useLocation();
  const {username, email, password, firstName, lastName, institution, courses, style, session, availability, zip, rates, bio} = state;

  const [tutors, setTutors] = useState([]);

  let axiosConfig = {
    headers: {
      "Content-Type": 'application/json',
    }
  };

  // Fetch the backend API info
  const fetchAPI = async () => {
    const post_response = await axios.post(API_DOMAIN + "/api/suggested_tutors", JSON.stringify({institution: "UW"}), axiosConfig);
    const get_response = await axios.get(API_DOMAIN + "/api/suggested_tutors", axiosConfig);
    setTutors(get_response.data.suggested_tutors);

  };

  //On initial render
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div className="container">
      <div className='header'>
        <div className='dropdown-container'>
          <Dropdown placeholder="Course" options={subjectOptions} className="search-dropdown"/>
          <Dropdown placeholder="Teaching Style" options={styleOptions} className="search-dropdown"/>
          <Dropdown placeholder="Session" options={sessionOptions} className="search-dropdown"/>
          <Dropdown placeholder="Availability" options={availabilityOptions} className="search-dropdown"/>
          <Dropdown placeholder="Distance" options={distanceOptions} className="search-dropdown"/>
        </div>
        <SearchBar placeholder="Search for tutors..." />
      </div>
      
      <h1 className='heading'>Suggested Tutors</h1>
      <div className='subheading'>Meet your match. Expert tutors tailored to your needs.</div>


    </div>
  )
}