import { useEffect, useState } from "react";
import axios from "axios";
// import { useAppContext } from "../Context/MealContext";

const useAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
//   const {state} = useAppContext()

  const sendRequest = async (endPoint?:string, body=null, method?:string, headers = null) => {
    let baseURL = "http://172.19.0.1:4000/";
    let url;

    if (endPoint) {
      url = baseURL + endPoint;
    }

    console.log("body",body);
    setLoading(true);
    try {
      let axiosConfig = {
        method: method ? method : body ? "POST" : "GET",
        url,
        // headers: { Authorization: `Bearer ${state?.token?.token}` },
      };
      if (body) {
        axiosConfig = {
          ...axiosConfig,
          data: body,
        };
      }

      // console.log("body",axiosConfig);

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
