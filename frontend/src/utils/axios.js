// 📂 /src/utils/axios.jsx
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true, // Include credentials for cross-origin requests
})


export default instance;

// https://jsonplaceholder.typicode.com/users

// https -> protocol
// jsonplaceholder -> domaain/name
// typicode.com -> subdomain
// /users -> endpoint/route