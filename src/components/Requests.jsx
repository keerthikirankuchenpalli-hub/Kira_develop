import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests } from "../utils/RequestSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requests = useSelector(
    (store) => store.requests.requests
  );

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/request/received",
        { withCredentials: true }
      );

      dispatch(addRequests(res.data.requests));
    } catch (err) {
      console.error("Error fetching requests:", err);
      dispatch(addRequests([]));
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!Array.isArray(requests)) {
    return <h1 className="text-center my-10">Loading...</h1>;
  }

  if (requests.length === 0) {
    return <h1 className="text-center my-10">No Requests Found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-2xl mb-4">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const user = request.fromUserId;

        return (
          <div
            key={request._id}
            className="card w-96 bg-base-300 shadow-xl my-4 mx-auto"
          >
            <div className="card-body">
              <h2 className="text-xl font-bold">
                {user.FirstName} {user.LastName}
              </h2>
              <p>{user.age}, {user.gender}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
