// src/components/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants"; // optional; or replace with string

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [FirstName, setFirstName] = useState(user?.FirstName || "");
  const [LastName, setLastName] = useState(user?.LastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Keep form in sync when `user` prop changes
  useEffect(() => {
    setFirstName(user?.FirstName || "");
    setLastName(user?.LastName || "");
    setPhotoUrl(user?.photoUrl || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setAbout(user?.about || "");
    setErrorMessage("");
    setSuccessMessage("");
  }, [user]);

  const saveChanges = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch(`${BASE_URL || "http://localhost:7272"}/profile/edit`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          FirstName,
          LastName,
          age: Number(age) || undefined,
          gender: (gender || "").toLowerCase(),
          photoUrl: photoUrl || undefined,
          about,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // backend might return { message: "..." } or throw
        setErrorMessage(data.message || "Failed to update profile");
        return;
      }

      // backend response shape may be { message, data: user } or user
      const updatedUser = data.data ? data.data : data;

      // update redux so UI updates immediately
      dispatch(addUser(updatedUser));

      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setErrorMessage("Network error while updating profile.");
    }
  };

  const cancel = () => {
    // reset form to current user values
    setFirstName(user?.FirstName || "");
    setLastName(user?.LastName || "");
    setPhotoUrl(user?.photoUrl || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setAbout(user?.about || "");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="card card-border bg-base-300 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">Edit Profile</h2>

        <label className="form-control w-full max-w-xs my-3">
          <span className="label-text">First Name</span>
          <input
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full max-w-xs my-3">
          <span className="label-text">Last Name</span>
          <input
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full max-w-xs my-3">
          <span className="label-text">Photo URL</span>
          <input
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            className="input input-bordered w-full"
          />
        </label>

        <div className="card card-border bg-base-200 w-full max-w-xs my-3 p-3">
          <label className="form-control w-full my-2">
            <span className="label-text">Age</span>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
              type="number"
              min={18}
              max={65}
            />
          </label>

          <label className="form-control w-full my-2">
            <span className="label-text">Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </label>

          <label className="form-control w-full my-2">
            <span className="label-text">About</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </label>
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <div className="flex gap-4 mt-4">
          <button className="btn btn-primary bg-primary" onClick={saveChanges}>
            Save Changes
          </button>

          <button className="btn btn-secondary bg-secondary" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
