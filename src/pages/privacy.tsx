import * as React from "react";
import { HeadFC, Link, PageProps } from "gatsby";
import "./index.css";

const PrivacyPage: React.FC<PageProps> = () => {
  return (
    <main className="content-shell">
      <h1 className="site-title">Privacy and cookies</h1>
      <p className="post-content">
        This blog optionally uses Google Analytics to understand traffic patterns and improve content quality.
      </p>

      <section className="post-content">
        <h2>What is collected</h2>
        <p>
          If you accept analytics cookies, Google Analytics may collect page views, approximate location,
          browser/device metadata, and referral source data.
        </p>
        <h2>Cookie usage</h2>
        <p>
          Analytics cookies can include identifiers such as <code>_ga</code> and <code>_ga_*</code>.
          They are used only for measurement.
        </p>
        <h2>Your choice</h2>
        <p>
          You can accept or decline analytics cookies from the cookie banner. If you accepted previously,
          use the <strong>Cookie settings</strong> button to change your decision.
        </p>
      </section>

      <p className="post-nav">
        <Link to="/">Home</Link>
      </p>
    </main>
  );
};

export default PrivacyPage;

export const Head: HeadFC = () => <title>Privacy and cookies</title>;
