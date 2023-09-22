import axios from "axios";

const inventoryDb = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default inventoryDb;