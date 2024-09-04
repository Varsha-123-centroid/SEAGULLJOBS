import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BASE_URL=process.env.REACT_APP_BASE_URL;
function Autocomplete({ value, onChange }) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const autocompleteStyles = {
    wrapper: {
      position: 'relative',
      marginTop: '0px',
      marginBottom: '15px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '16px',
    },
    suggestionsList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderTop: 'none',
      listStyleType: 'none',
      margin: 0,
      padding: 0,
      maxHeight: '200px',
      overflowY: 'auto',
      zIndex: 1000,
    },
    suggestionItem: {
      padding: '10px',
      cursor: 'pointer',
    },
    suggestionItemHover: {
      backgroundColor: '#f0f0f0',
    },
  };
  function formatPlaceholder(text) {
    return text.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 1 && !isSelected) {
        try {
          //const response = await axios.get(`http://localhost:8000/api/designations?query=${input}`);
          const response = await axios.get(`${BASE_URL}designations?query=${input}`);
          
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceTimer);
  }, [input, isSelected]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsSelected(false);
    onChange(''); // Clear the selected ID in the parent component
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.designation);
    onChange(suggestion.id); // Pass the selected ID to the parent component
    setSuggestions([]);
    setIsSelected(true);
  };

  return (
    <div  style={autocompleteStyles.wrapper}>
      <input
        type="text"
        value={input}
        id="skills"
        name="skills"
        onChange={handleInputChange}
        placeholder={formatPlaceholder("search designation")}
        style={autocompleteStyles.input}
        autoComplete="off" 
      />
       {!isSelected && suggestions.length > 0 && (
        <ul style={autocompleteStyles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={autocompleteStyles.suggestionItem}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = autocompleteStyles.suggestionItemHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '';
              }}
            >
              {suggestion.designation}
            </li>
          ))}
        </ul>
      )}
      {/* {!isSelected && (
        <ul>
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.designation}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default Autocomplete;