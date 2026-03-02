# RJM Blog Site

Gatsby-based blog with optional Google Analytics (GA4) tracking behind explicit cookie consent.

## Local development

```bash
npm install
npm run develop
```

## Analytics setup

Set your GA4 measurement ID as an environment variable before build/deploy:

```bash
GATSBY_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Behavior:
- Analytics scripts are loaded only after the visitor accepts analytics cookies.
- If consent is declined, GA tracking is disabled and GA cookies are removed when possible.
- Visitors can reopen consent choices via the `Cookie settings` button.

## Useful scripts

```bash
npm run develop
npm run build
npm run serve
npm run typecheck
npm run clean
```
