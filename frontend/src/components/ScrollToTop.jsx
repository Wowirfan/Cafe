import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on every route change — without this, navigating between
// pages keeps the previous page's scroll position.
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);
  return null;
};

export default ScrollToTop;
