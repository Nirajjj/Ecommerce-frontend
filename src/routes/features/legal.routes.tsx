import About from "@/pages/public/legal/About";
import Contact from "@/pages/public/CustomerService/Contact";
import PrivacyPolicy from "@/pages/public/legal/PrivacyPolicy";
import RefundPolicy from "@/pages/public/legal/RefundPolicy";
import ShippingPolicy from "@/pages/public/legal/ShippingPolicy";
import TermsAndConditions from "@/pages/public/legal/TermsAndConditions.tsx";
import type { RouteObject } from "react-router-dom";
import FAQ from "@/pages/public/CustomerService/FAQ";

const legalRoutes: RouteObject[] = [
  { path: "privacy-policy", element: <PrivacyPolicy /> },
  { path: "terms-and-conditions", element: <TermsAndConditions /> },
  { path: "refund-policy", element: <RefundPolicy /> },
  { path: "contact", element: <Contact /> },
  { path: "about", element: <About /> },
  { path: "shipping-policy", element: <ShippingPolicy /> },
  { path: "faq", element: <FAQ /> },
];

export default legalRoutes;
