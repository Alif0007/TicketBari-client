import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://ticketbari-server-fawn.vercel.app"
});

export default axiosPublic;
