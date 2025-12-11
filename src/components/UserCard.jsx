const UserCard = ({ user }) => {

    const {FirstName, LastName, photoUrl, age, gender, about, skills} = user;
  if (!user) return null;

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{FirstName} {LastName}</h2>
    {age && <p>Age: {age}, Gender: {gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center mt-4">
    
        <button className="btn btn-secondary bg-secondary">Ignore</button>
      <button className="btn btn-primary bg-primary">Interested</button>
    </div>
  </div>
</div>
  );
};

export default UserCard;
