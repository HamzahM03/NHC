import { useEffect, useState } from "react";
import API from "../services/api.js";
import AddKid from "../components/AddKid";

const Dashboard = () => {
  const [kids, setKids] = useState([]);

  useEffect(() => {
    const fetchKids = async () => {
      try {
        const response = await API.get("/kids");
        console.log(response.data);
        setKids(response.data);
      } catch (error) {
        console.error("Error fetching kids:", error);
      }
    };

    fetchKids();
  }, []);

  const handleKidAdded = (newKid) => {
    setKids([...kids, newKid]); // Update state with new kid
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Total Kids: {kids.length}</h2>

      <AddKid onKidAdded={handleKidAdded} />

      <ul>
  {kids.map((kid) => (
    <li key={kid._id}>
      {kid.name} 
      {kid.parentName ? ` (Parent: ${kid.parentName})` : ""} 
      - {kid.sessionsRemaining} sessions
      - Payment: {kid.paymentType}
    </li>
  ))}
</ul>


    </div>
  );
};

export default Dashboard;
