import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

   const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
 const navigate = useNavigate ();
 const handleLogin = async () => {
  try {
    const res = await axios.post(BASE_URL + "/login", {
  Email: Email,
  Password: Password
}, { withCredentials: true });

    dispatch(addUser(res.data));
    navigate("/");
  } catch (err) {
    console.error(err);
    setErrorMessage(err.response?.data?.message || "Invalid email or password");
  }
};

 const handleSignup = async () => {
  try {
   const res = await axios.post(
  BASE_URL + "/signup",
  {
    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Password: Password,
    age,
    gender,
    about
  },
  { withCredentials: true }
);


    dispatch(addUser(res.data));
    navigate("/profile");
  } catch (err) {
    console.error(err);
    setErrorMessage(err.response?.data?.message || "Signup failed");
  }
};


  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body my-100">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

        {!isLoginForm && <><label className="input validator my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="FirstName"
                value={FirstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="input validator my-2">
                <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="LastName"
                value={LastName}
                required
                
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

              <label className="input validator my-2">
                <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="age"
                value={age}
                required
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

              <label className="input validator my-2">
                <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="gender"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

              <label className="input validator my-2">
                <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="about"
                value={about}
                required
                onChange={(e) => setAbout(e.target.value)}
              />
            </label></>}

          <label className="input validator my-2">
             <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="email"
              value={Email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input validator">
             <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              value={Password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div> 
     
          {/* Conditionally render error message */}
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p> // Display error message if set
          )}
          <div className="card-actions justify-center">
            <button
  className="btn btn-primary bg-primary"
  onClick={isLoginForm ? handleLogin : handleSignup}
>
  {isLoginForm ? "Login" : "Sign Up"}
</button>

            </div>
             <p className="text-center mt-4 cursor-pointer" onClick={() => setIsLoginForm(!isLoginForm)}>
              {isLoginForm ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
