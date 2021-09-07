import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function useFetchToken(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const token = useSelector((s) => s.user?.token);

  if (!token) setError("Token no encontrado...");

  useEffect(() => {
    const opts = {};
    if (token) {
      opts.headers = { Authorization: "Bearer " + token };
    }
    fetch(url, opts)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setData(data.data);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => setError(error.message));
  }, [url, token]);

  return [data, error, setData];
}

export default useFetchToken;

// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

// function useFetchToken(url) {
//   const [data, setData] = useState(null);
//   const token = useSelector((s) => s.user?.token);

//   useEffect(() => {
//     const opts = {};
//     if (token) {
//       opts.headers = { Authorization: "Bearer " + token };
//     }
//     fetch(url, opts)
//       .then((res) => res.json())
//       .then((data) => setData(data));
//   }, [url, token]);

//   return data;
// }

// export default useFetchToken;
