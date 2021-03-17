import { useState, useEffect } from "react";

const useNetworkOnLine = () => {
  const [status, setStatus] = useState(navigator.onLine);
  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);
  return status;
};
export default useNetworkOnLine;
