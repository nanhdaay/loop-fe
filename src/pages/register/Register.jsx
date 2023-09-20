import { Link, Navigate } from "react-router-dom";
import "./Register.scss"
import { useState } from "react";
import axios from "axios";

const Register = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://loop-be.onrender.com/api/auth/register", inputs);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err)

  return (
    <div className="register">
      <div className="title">
        <h1>welcome to LOOP</h1>
      </div>
      <div className="card">
        <div className="right">
           <h1>Register</h1>
          <form>
            <input type="text" placeholder="username" name="username" onChange={handleChange}/>
            <input type="email" placeholder="email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
        <div className="top">
          <span>Do you have an account?</span>
          <Link to="/">
          Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register;