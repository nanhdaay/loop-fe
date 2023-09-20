import { Link, useNavigate } from "react-router-dom";
import "./Login.scss"
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

const Login = () => {

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const {login} = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/home");
    } catch (err) {
      if (err.response) {
        // The error has a response object, so we can access err.response.data
        setErr(err.response.data);
      } else {
        // Handle the error without a response object (e.g., network error)
        setErr("An error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div className="login">
      <div className="title">
      <h1>welcome back</h1>
      </div>
      <div className="card">
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="password" name="password" onChange={handleChange}/>
            {err && err}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
        <div className="top">
          <span>Don't you have an account?</span>
          <Link to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Login;