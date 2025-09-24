import { useEffect, useState } from "react";

// Senior level: We could add abort controller to the function to like stop the fetcing when the component unmounts

const useFetch = (url: string = "") => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    if (!url) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch(url);

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Something wrong happened!");
      }

      setData(responseData);
    } catch (error) {
      console.error(error);
      let errorMessage = "Something wrong happend";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setData(null);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;
