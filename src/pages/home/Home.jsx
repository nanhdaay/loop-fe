import React from 'react'
import Posts from '../../components/posts/Posts';
import Navbar from '../../components/navbar/Navbar';
import Bottombar from '../../components/bottombar/Bottombar';
import "../home/Home.scss";

const Home = () => {

  return (
    <div className="container">
      <div className="navbar">
        <Navbar />
      </div>
      <div className='home'>
        <Posts />
      </div>
      <div className="bottombar">
        <Bottombar/>
      </div>
    </div>
  )
}

export default Home;