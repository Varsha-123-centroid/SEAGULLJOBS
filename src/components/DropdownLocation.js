import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL=process.env.REACT_APP_BASE_URL;
const DropdownLocation = ({ onChange }) => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  useEffect(() => {
    if (query.length >= 0) {
      axios
           .get(`${BASE_URL}locations?query=${query}`)
       // .get(`http://localhost:8000/api/locations?query=${query}`)
        .then((response) => {
         // alert(JSON.stringify(response.data));
         setLocations(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    } else {
        setLocations([]);
    }
  }, [query]);

  return (
    <div>
    
      <select   onChange={handleChange} className="form-control" id="location" name="location" placeholder="Enter Location">
		<option>SELECT LOCATION </option>
                    {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.location_name}
          </option>
        ))}
				</select> 

    </div>
  );
};

export default DropdownLocation;
