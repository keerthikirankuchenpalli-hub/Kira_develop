import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [Email, setEmail] = useState("rahul@gmail.com");
  const [Password, setPassword] = useState("Rahul@1997");
   const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
 const navigate = useNavigate ();
  const handleLogin = async () => {
  // console.log("BASE_URL =", BASE_URL);
  // console.log("FINAL URL:", `${BASE_URL}/login`);

    try {
   const res = await axios.post(
  BASE_URL + "/login",
  {
    Email,
    Password
  },
  { withCredentials: true } 
);


 console.log("Login success:", res.data);
 dispatch(addUser(res.data));
  return navigate("/"); 

    } catch (err) {
      console.error(err);
       setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body my-100">
          <h2 className="card-title justify-center">Login</h2>

          <label className="input validator my-2">
            <input
              type="email"
              value={Email}
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input validator">
            <input
              type="password"
              value={Password}
              required
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div> 
     
          {/* Conditionally render error message */}
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p> // Display error message if set
          )}
          <div className="card-actions justify-center">
            <button className="btn btn-primary bg-primary" onClick={handleLogin}>
              Login
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
