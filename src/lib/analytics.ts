import { env } from "@/config/evn";
import ReactGA from "react-ga4";

export const initAnalytics = () => {
  ReactGA.initialize(env.VITE_GA_ID);
};

export const trackPage = (path: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (category: string, action: string) => {
  ReactGA.event({
    category,
    action,
  });
};
