import * as React from "react";
import type { GatsbySSR } from "gatsby";
import CookieConsent from "./src/components/CookieConsent";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) => {
  return <CookieConsent>{element}</CookieConsent>;
};
