import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData([]);
      setLoading(false);
    }, 500);
  }, [url]);

  return { data, loading };
}

export default useFetch;
