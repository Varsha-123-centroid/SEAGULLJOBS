import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const Dropdown = ({ onChange }) => {
 
  const [query, setQuery] = useState('');
  const [designations, setDesignations] = useState([]);
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  useEffect(() => {
   
    if (query.length >= 0) {
      axios
        .get(`${BASE_URL}designations?query=${query}`)
      //  .get(`http://localhost:8000/api/designations?query=${query}`)
        .then((response) => {
         // alert(JSON.stringify(response.data));
          setDesignations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
      setDesignations([]);
    }
  }, [query]);

  return (
    <div>
    
      <select  onChange={handleChange} className="form-control" id="skils" name="skils" placeholder="Enter Skils / Designation">
										<option>Enter Skils / Designation </option>
                    {designations.map((designation) => (
          <option key={designation.id} value={designation.id}>
            {designation.designation}
          </option>
        ))}
				</select> 

    </div>
  );
};

export default Dropdown;
