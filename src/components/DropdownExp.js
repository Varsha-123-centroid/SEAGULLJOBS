import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const DropdownExp = ({ onChange }) => {
  const [query, setQuery] = useState('');
  const [experience, setExperience] = useState([]);
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  useEffect(() => {
   
    if (query.length >= 0) {
      axios
        .get(`${BASE_URL}minimumExp`)
      //  .get(`http://localhost:8000/api/minimumExp`)
        
        .then((response) => {
         // alert(JSON.stringify(response.data));
         setExperience(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
        setExperience([]);
    }
  }, [query]);

  return (
    <div>
    
      <select   onChange={handleChange} className="form-control" id="exp" name="exp" placeholder="Enter Your Experience">
      <option>SELECT  EXPERIENCE </option>
      {experience.map((exp, index) => (
        <option key={index} value={exp}>
          {exp} Years
        </option>
      ))}
		</select> 

    </div>
  );
};

export default DropdownExp;
