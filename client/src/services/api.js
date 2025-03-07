import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Ensure you have this set in your .env file
});

// Fetch all kids
export const fetchKids = async () => {
    const response = await API.get("/kids");
    return response.data; // Assuming the API returns an array of kids
};

export default API;
