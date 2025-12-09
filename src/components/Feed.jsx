import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedslice.js";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((state) => state.feed.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });

      dispatch(addFeed(res.data.data)); // FIXED
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  console.log("FEED DATA =", feed);

  return (
    <div className="flex flex-col items-center gap-10 mt-10">
      {feed.length > 0 ? (
        <UserCard user={feed[0]} />
      ) : (
        <p>Loading feed...</p>
      )}
    </div>
  );
};

export default Feed;
