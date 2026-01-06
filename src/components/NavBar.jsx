import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { logoutUser } from "../utils/userSlice"; 


const NavBar = () => {
     const user = useSelector((state) => state.user.user);
     const dispatch = useDispatch ();
     const navigate = useNavigate();

     const handleLogout = async () => {
      try {
        await axios.post(
        BASE_URL + "/logout",{},{withCredentials: true});
         dispatch(logoutUser()); 
         return navigate("/login");
      }
     catch(err) {

     }
    };

    return (
            <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to = "/" className="btn btn-ghost text-xl">Kira-dev</Link>
  </div>
  <div className="flex gap-2">
   <div className="from-control"></div>
    {user && (
      <div className="dropdown dropdown-end mx-6 flex">
     <p>Welcome, {user.FirstName} </p>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to = "/profile" className="justify-left">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <button  className="w-full text-left"
        onClick={() => navigate('/connections')}>
  Connections
</button>
 <button  className="w-full text-left"
        onClick={() => navigate('/requests')}>
  requests
</button>
        <li><button   onClick={handleLogout}>Logout</button></li>

      </ul>
    </div>
    )}
  </div>
</div>
     
    );
}

export default NavBar;