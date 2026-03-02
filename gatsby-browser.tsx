import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import CookieConsent from "./src/components/CookieConsent";
import { initializeAnalyticsFromConsent, trackPageView } from "./src/lib/analytics";

require("prismjs/themes/prism-tomorrow.css");
require("./src/pages/index.css");

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => {
  return <CookieConsent>{element}</CookieConsent>;
};

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  initializeAnalyticsFromConsent();
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = ({ location }) => {
  trackPageView(location.pathname + location.search + location.hash);
};
