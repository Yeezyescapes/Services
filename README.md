# Yeezy Escapes Business Services

The original Yeezy Escapes Services website, restored from the supplied live page and refined with a champagne logo background, dark plum/black hero and services, gold and blush accents, Yisbeth’s real professional photo, complete credentials, and accessible interactions.

## Preview

Requires Node.js 20+. No runtime dependencies or build step.

```sh
npm run dev
```

Preview listens on port 3000; use `PORT` to override it. Deploy `index.html`, `styles.css`, `app.js`, and `assets/` to a static host.

## Content and assets

The page, business logo, and Yisbeth Smith photo were retrieved from https://yeezy-services.smithyisbeth.chatgpt.site. The photo was served as PNG data and is saved with a matching `.png` extension. Provider-injected challenge scripts were omitted from the static source. Original service content and Rapid Rentals CRM example are retained. Rapid Rentals links to https://rentrapidnj.com.

The About section includes the Business Administration & Accounting degree, 8+ years in property management, 4,000+ doors, and Apple Developer/custom app experience.

## Booking

Direct consultation links open email to `info@yeezyescapes.com`. Meeting buttons open the booking dialog; the form validates details and prepares an email link and copyable message. Visitors must open their email app and send the request. No booking is submitted or confirmed automatically, and no form data is sent to a server. Requested times require email confirmation.

## Checks

```sh
npm install --no-save --package-lock=false --cache /tmp/yeezy-npm-cache playwright
npm run dev
npm test
```

Tests use Chromium at `/usr/bin/chromium` (override `CHROMIUM_PATH`) and preview port 3000 (override `TEST_BASE_URL`). They verify real image loading, service details, all four finder recommendations, booking email contents, modal keyboard closing, reduced motion, and overflow at 320/390/768/1280px.
