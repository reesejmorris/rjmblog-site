export type ConsentStatus = "accepted" | "declined" | null;

const CONSENT_KEY = "rjm_cookie_consent_analytics";
const ANALYTICS_SCRIPT_ID = "rjm-ga4-script";
const TRACKING_ID = process.env.GATSBY_GA_MEASUREMENT_ID;
const CONSENT_CHANGED_EVENT = "rjm-consent-changed";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __rjmGaConfigured?: boolean;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const canUseDOM = (): boolean => typeof window !== "undefined" && typeof document !== "undefined";

export const hasTrackingId = (): boolean => Boolean(TRACKING_ID);

export const getConsentStatus = (): ConsentStatus => {
  if (!canUseDOM()) {
    return null;
  }

  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "declined") {
    return value;
  }

  return null;
};

export const setConsentStatus = (value: Exclude<ConsentStatus, null>): void => {
  if (!canUseDOM()) {
    return;
  }

  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }));
};

export const onConsentChange = (handler: (status: ConsentStatus) => void): (() => void) => {
  if (!canUseDOM()) {
    return () => undefined;
  }

  const listener = (event: Event): void => {
    const customEvent = event as CustomEvent<ConsentStatus>;
    handler(customEvent.detail ?? getConsentStatus());
  };

  window.addEventListener(CONSENT_CHANGED_EVENT, listener);
  return () => window.removeEventListener(CONSENT_CHANGED_EVENT, listener);
};

export const hasAnalyticsConsent = (): boolean => getConsentStatus() === "accepted";

const removeCookieByName = (name: string): void => {
  if (!canUseDOM()) {
    return;
  }

  const parts = window.location.hostname.split(".");
  const domains = new Set<string>([window.location.hostname]);

  for (let index = 0; index < parts.length - 1; index += 1) {
    const suffix = parts.slice(index).join(".");
    if (suffix.includes(".")) {
      domains.add(`.${suffix}`);
      domains.add(suffix);
    }
  }

  domains.forEach((domain) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}; SameSite=Lax`;
  });
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
};

const removeGoogleAnalyticsCookies = (): void => {
  if (!canUseDOM()) {
    return;
  }

  document.cookie
    .split(";")
    .map((cookie) => cookie.trim().split("=")[0])
    .filter((cookieName) => cookieName === "_ga" || cookieName.startsWith("_ga_"))
    .forEach(removeCookieByName);
};

const initGtag = (): void => {
  if (!canUseDOM()) {
    return;
  }

  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  if (!window.gtag) {
    // Match Google's recommended queue format exactly: dataLayer.push(arguments)
    // so gtag.js can process queued commands correctly after script load.
    window.gtag = function gtag(...args: unknown[]): void {
      window.dataLayer?.push(arguments);
    };
  }

  if (!window.__rjmGaConfigured && TRACKING_ID) {
    window.gtag("js", new Date());
    window.gtag("config", TRACKING_ID, { anonymize_ip: true });
    window.__rjmGaConfigured = true;
  }
};

export const enableAnalytics = (): boolean => {
  if (!canUseDOM() || !TRACKING_ID) {
    return false;
  }

  window[`ga-disable-${TRACKING_ID}`] = false;

  if (!document.getElementById(ANALYTICS_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = ANALYTICS_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`;
    document.head.appendChild(script);
  }

  initGtag();
  return true;
};

export const disableAnalytics = (): void => {
  if (!canUseDOM()) {
    return;
  }

  if (TRACKING_ID) {
    window[`ga-disable-${TRACKING_ID}`] = true;
  }

  removeGoogleAnalyticsCookies();
};

export const initializeAnalyticsFromConsent = (): void => {
  if (!canUseDOM()) {
    return;
  }

  if (getConsentStatus() === "accepted") {
    enableAnalytics();
    return;
  }

  disableAnalytics();
};

export const trackPageView = (path: string): void => {
  if (!canUseDOM() || !TRACKING_ID || !hasAnalyticsConsent() || !window.gtag) {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
};
