import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

// export const usePageTracking = () => {
//   const location = useLocation();
//   useEffect(() => {
//     ReactGA.initialize('UA-190526775-1');
//     ReactGA.pageview(location.pathname + location.search);
//   }, [location]);
// };

export const usePageTracking = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize('UA-190526775-1');
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialized, location]);
};