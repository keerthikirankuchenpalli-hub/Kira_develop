import { useSelector } from "react-redux";



const Profile = () => {
  const stateUser = useSelector((state) => state.user);   // get the slice
  const user = stateUser?.user;                            // optional chaining

  if (!user) {
    return <div>Loading user info or please login...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {user.Email}</p>
      <p>Name: {user.FirstName} {user.LastName}</p>
    </div>
  );
};

export default Profile;
