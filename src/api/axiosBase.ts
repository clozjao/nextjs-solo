import axios from "axios";

const axiosBase = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export default axiosBase;
