import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";


const Connections = () => {


    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/connections", {
                 withCredentials: true 
                });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error("Error fetching connections:", err);
        }};
      
        useEffect(() => {
            fetchConnections();
        }, []);

        if(!connections) return;

        if(connections.length === 0) return <h1> No Connections Found</h1>;

    return <div className="text-center my-10">
        <h1 className= "text-bold text-2xl">Connections</h1>

        {connections.map((connection) => {
            const {FirstName, LastName, photoUrl, age, gender, About} = connection;

            return (
               <div className="card w-96 bg-base-300 shadow-xl my-4 mx-auto" key={connection._id}>
  <div className="card-body">
    <div className="flex items-center gap-4">
                    <img alt="photo" className="w-20 h-20 rounded-full my-4" src={photoUrl} />
                    <div>
                        <h2 className="text-xl font-bold">
                            {FirstName + " " + LastName}</h2>
                        <p>{age}, {gender}</p>
                        <p>{About}</p>
                    </div>
                </div>
  </div>
</div>
            );
        })}
    </div>;
}
export default Connections;