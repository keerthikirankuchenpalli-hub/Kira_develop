import { useSelector } from "react-redux";

const Profile = () => {

  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <h1>User Profile</h1>

      {user ? (
        <p>Email: {user.Email}</p>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default Profile;
