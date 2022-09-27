import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const useFetch = (url) => {
  const proxy=`http://localhost:8080/api`+url;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(proxy, {
          headers: {
            'Authorization': `Bearer ${user.jwt}` 
          }
        });
       // const getResult =await res.json();
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();

if(data.length===0){
  reFetch();
}

  }, [proxy]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(proxy);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return {data,loading,error,reFetch}
};

export default useFetch;