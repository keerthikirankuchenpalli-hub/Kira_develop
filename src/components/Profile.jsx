import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const stateUser = useSelector((store) => store.user);
  const user = stateUser?.user;

  console.log("PROFILE: user =>", user);

  if (!user) return <div>Loading user info or please login...</div>;

  return (
    <div className="flex justify-center gap-10 pt-10">
      {/* left: form */}
      <EditProfile user={user} />

      {/* right: preview */}
      <div className="card bg-base-300 w-96 shadow-xs p-6">
        <div className="flex flex-col items-center">
          <img
            src={user.photoUrl}
            alt="user"
            className="w-32 h-32 rounded-full object-cover border-2 border-primary shadow-md"
          />
          <h2 className="text-xl font-bold mt-4">
            {user.FirstName} {user.LastName}
          </h2>
          <p className="text-sm text-gray-400 mt-1 text-center">{user.about}</p>
          <div className="divider my-4"></div>
          <div className="w-full space-y-3">
            <p className="flex justify-between text-gray-300">
              <span className="font-semibold">Email:</span>
              <span>{user.Email}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span className="font-semibold">Age:</span>
              <span>{user.age}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span className="font-semibold">Gender:</span>
              <span className="capitalize">{user.gender}</span>
            </p>
            <p className="flex justify-between text-gray-300">
              <span className="font-semibold">Joined:</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </p>
          </div>
          <div className="flex gap-4 mt-5">
            <button className="btn btn-secondary bg-secondary">Ignore</button>
            <button className="btn btn-primary bg-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
