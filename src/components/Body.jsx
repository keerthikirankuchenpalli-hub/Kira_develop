// src/components/Body.jsx
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSlice = useSelector((store) => store.user); // { user: ... }
  const currentUser = userSlice?.user; // actual user object or null

  const fetchUser = async () => {
    console.log("BODY: fetchUser() called. currentUser:", currentUser);

    // only skip if we already have a *real* user object
    if (currentUser && Object.keys(currentUser).length > 0) {
      console.log("BODY: currentUser exists — skipping fetch.");
      return;
    }

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      console.log("BODY: GET /profile/view status:", res.status);
      console.log("BODY: GET /profile/view raw res.data:", res.data);

      // handle backend shapes: { data: user } OR user
      const userFromServer = res.data && (res.data.data ? res.data.data : res.data);

      if (!userFromServer) {
        console.warn("BODY: No user object found in response:", res.data);
        navigate("/login");
        return;
      }

      // dispatch the actual user object
      dispatch(addUser(userFromServer));
      console.log("BODY: dispatched user to redux:", userFromServer);
    } catch (err) {
      console.error("BODY: FETCH USER ERROR (full):", err);
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
