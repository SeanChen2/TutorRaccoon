import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const DOMAIN = "http://localhost:8080"

export default function App() {

  const [tutors, setTutors] = useState([]);

  // Fetch the backend API info
  const fetchAPI = async () => {

    const response = await axios.get(DOMAIN + "/api/suggested_tutors");
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