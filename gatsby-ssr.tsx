import * as React from "react";
import type { GatsbySSR } from "gatsby";
import CookieConsent from "./src/components/CookieConsent";

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) => {
  return <CookieConsent>{element}</CookieConsent>;
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <link key="gfonts-preconnect" rel="preconnect" href="https://fonts.googleapis.com" />,
    <link key="gfonts-preconnect-static" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      key="gfonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Spectral:wght@300;400&display=swap"
    />,
  ]);
  setPreBodyComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var s=localStorage.getItem('theme');var p=s||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.setAttribute('data-theme',p);}catch(e){}})();`,
      }}
    />,
  ]);
};
