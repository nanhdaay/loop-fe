import "./Bottombar.scss"
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { colors } from "@mui/material";

const Bottombar = () => {

    const {currentUser} = useContext(AuthContext);

    return (
    <div className='bottombar'>
        <Link to="/home">
        <HomeOutlinedIcon fontSize="large"/>
        </Link>
        <Link to="/createpost">
        <AddOutlinedIcon fontSize="large"/>
        </Link>
        <Link  to={`/profile/${currentUser.id}`} style={{textDecoration:"none", color:"inherit"}}>
        <AccountCircleOutlinedIcon fontSize="large"/>
        </Link>
    </div>
  )
}

export default Bottombar
