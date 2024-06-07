import { useEffect, useState } from "react";
import axios from "axios";
// import { useAppContext } from "../Context/MealContext";

const useAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
//   const { state } = useAppContext();

  // Safe localStorage access
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("Token");
    }
    return null;
  };

  let token = getToken();
  console.log("token", token);

  const sendRequest = async (endPoint, body = null, method = "GET", headers = null) => {
    let baseURL = "http://172.19.0.1:4000/";
    let url = endPoint ? baseURL + endPoint : baseURL;

    console.log("body", body);
    setLoading(true);
    try {
      let axiosConfig = {
        method: method || (body ? "POST" : "GET"),
        url,
        headers: {
          // Authorization: token ? `Bearer ${token}` : undefined,
          ...headers,
        },
        data: body,
      };

      const response = await axios(axiosConfig);
      setData(response.data);
      return response.data;
    } catch (error) {
      setError(error);
      //   throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, sendRequest };
};

export default useAxios;
