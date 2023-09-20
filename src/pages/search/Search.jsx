import React, { useState } from 'react';
import { makeRequest } from "../../axios";
import { Link } from 'react-router-dom'; 
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import "../search/Search.scss";

export const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle the search query input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await makeRequest.get(`/users/search/${searchQuery}`);
      const usersData = response.data;

      console.log("Search results from API:", usersData);

      // Ensure usersData is an array or convert it to an array
      const usersArray = Array.isArray(usersData) ? usersData : [usersData];

      setSearchResults(usersArray);
    } catch (error) {
      console.error("Error searching for users:", error);
      // Handle the error here
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(); // Trigger the search function when Enter is pressed
    }
  };

  return (
    <div className='search'>
      <div className="search__field">
        <div className="back">
          <Link to="/home">
            <ArrowBackIosOutlinedIcon/>
          </Link>
        </div>
        <div className="search__input">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress} // Add the key press event handler
          />
        </div>
      </div>

      <div className="search__results"> {/* Container for search results */}
        <ul>
          {searchResults.map((user) => (
            <li className='search__result' key={user.id}>
              <Link style={{textDecoration: 'none'}} to={`/profile/${user.id}`}>{user.username}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
