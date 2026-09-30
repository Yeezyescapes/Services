# Yeezy Escapes Services

A responsive, accessible static business website with a white brand header, service cards, experience and credentials, client audiences, FAQs, and a consultation inquiry builder. Includes original SVG branding and property artwork; these are new assets, not assets retrieved from the reference site.

## Local preview

Requires Node.js 20 or later. No dependency installation is needed.

```sh
npm run dev
```

The server listens on port 3000 (override with `PORT`). Open the local server in a browser. `npm test` runs browser checks; see the validation section below.

## Publishing

Deploy `index.html`, `styles.css`, `app.js`, and `assets/` to any static host. The Node server is for development preview. System fonts and local artwork keep the site self-contained.

## Consultation inquiries

Consultation buttons open an email to **info@yeezyescapes.com**. The form validates entries and opens a prepared message in the visitor’s email client, with a copy fallback. It does not automatically send email or confirm appointments.

## Validation

`npm test` uses Playwright and Chromium to check desktop/mobile rendering, navigation, service selection, validation, inquiry generation, FAQ interaction, and console errors. Install the test tool without changing project dependencies:

```sh
npm install --no-save --package-lock=false --cache /tmp/yeezy-npm-cache playwright
npm run dev
npm test
```

Set `CHROMIUM_PATH` if Chromium is not at `/usr/bin/chromium`, and `TEST_BASE_URL` if preview is not on port 3000. Test tooling is not required to run or deploy the site.

The supplied reference URL returned HTTP 403 in the development environment. The design and content were created from the business requirements rather than a verified copy of that page.
