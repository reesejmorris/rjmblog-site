import * as React from "react";
import { Link } from "gatsby";
import {
  ConsentStatus,
  disableAnalytics,
  enableAnalytics,
  getConsentStatus,
  hasTrackingId,
  onConsentChange,
  setConsentStatus,
} from "../lib/analytics";

type Props = {
  children: React.ReactNode;
};

const CookieConsent: React.FC<Props> = ({ children }) => {
  const [consent, setConsent] = React.useState<ConsentStatus>(null);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  React.useEffect(() => {
    const currentConsent = getConsentStatus();
    setConsent(currentConsent);

    const unsubscribe = onConsentChange((nextConsent) => {
      setConsent(nextConsent);
      setSettingsOpen(false);
    });

    return unsubscribe;
  }, []);

  const acceptCookies = (): void => {
    setConsentStatus("accepted");
    enableAnalytics();
  };

  const declineCookies = (): void => {
    setConsentStatus("declined");
    disableAnalytics();
  };

  const showBanner = consent === null || settingsOpen;

  return (
    <>
      {children}

      {consent !== null && !showBanner ? (
        <button className="cookie-settings-button" type="button" onClick={() => setSettingsOpen(true)}>
          Cookie settings
        </button>
      ) : null}

      {showBanner ? (
        <aside className="cookie-banner" aria-live="polite" role="dialog" aria-label="Cookie preferences">
          <p className="cookie-banner-title">Analytics cookies</p>
          <p className="cookie-banner-copy">
            This site uses Google Analytics to measure traffic and improve blog content. Accepting enables
            analytics cookies. You can change this choice any time.
          </p>

          {!hasTrackingId() ? (
            <p className="cookie-banner-warning">
              Analytics is currently disabled because <code>GATSBY_GA_MEASUREMENT_ID</code> is not set.
            </p>
          ) : null}

          <p className="cookie-banner-copy">
            Read more in the <Link to="/privacy">privacy policy</Link>.
          </p>

          <div className="cookie-banner-actions">
            <button className="cookie-button cookie-button-secondary" type="button" onClick={declineCookies}>
              Decline
            </button>
            <button className="cookie-button cookie-button-primary" type="button" onClick={acceptCookies}>
              Accept analytics
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
};

export default CookieConsent;
