import React from 'react';
import { Link } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "./Navbar.scss"; 

const Navbar = () => {


  return (
    <div className='navbar'>
      <div className="name">
        <h1>loops feed</h1>
      </div>
      <div className="searchicon">
      <div className='icon'>
      <Link to="/search">
        <SearchOutlinedIcon fontSize='medium'/>
      </Link>
      </div>
      </div>
    </div>
  );
}

export default Navbar;
