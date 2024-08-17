import { useState, useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

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
  const {username, email, password} = state;

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
    <>
      <div>
        <h1>Suggested Tutors (test)</h1>
        <div>
          <ul>
            {
              //"For each tutor with index i, return the following HTML..."
              tutors.map((tutor, index) => (
                <li key={index}>{tutor["name"]}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}