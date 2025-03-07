import { useState } from "react";
import API from "../services/api.js"; // Make sure API is correctly set up

const AddKid = ({ onKidAdded }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [sessions, setSessions] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !age || !sessions) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await API.post("/kids", { name, age, sessions });
      onKidAdded(response.data); // Update parent component with new kid
      setName("");
      setAge("");
      setSessions("");
    } catch (error) {
      console.error("Error adding kid:", error);
      alert("Failed to add kid. Try again!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-kid-form">
      <input
        type="text"
        placeholder="Kid's Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Sessions (1, 4, 8)"
        value={sessions}
        onChange={(e) => setSessions(e.target.value)}
      />
      <button type="submit">Add Kid</button>
    </form>
  );
};

export default AddKid;
