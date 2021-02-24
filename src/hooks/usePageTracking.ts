import { useEffect} from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga";

export const usePageTracking = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname + location.search);
    ReactGA.initialize('UA-190526775-1');
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};