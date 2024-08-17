import { useState, useEffect } from 'react'
import '../css/Home.css'
import axios from 'axios'

const API_DOMAIN = "http://localhost:8080"
/*
ALL ICON LINKS:
<a href="https://www.flaticon.com/free-icons/email" title="email icons">Email icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik - Flaticon</a>
<a href="https://www.flaticon.com/free-icons/password" title="password icons">Password icons created by Prosymbols Premium - Flaticon</a>
*/

export default function Home() {
  const [tutors, setTutors] = useState([]);

  // Fetch the backend API info
  const fetchAPI = async () => {

    const response = await axios.get(API_DOMAIN + "/api/suggested_tutors");
    setTutors(response.data.tutors);
    console.log(tutors)

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
              //"For each user with index i, return the following HTML..."
              tutors.map((user, index) => (
                <li key={index}>{user}</li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}