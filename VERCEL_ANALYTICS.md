# Vercel Web Analytics Integration

This document describes the integration of Vercel Web Analytics into the Carlos Lamas portfolio website.

## Overview

Vercel Web Analytics has been integrated into this static HTML portfolio to track visitor statistics and page views. This provides insights into user behavior and website performance.

## Implementation Details

### What Was Changed

The Vercel Web Analytics script has been added to `index.html` to enable analytics tracking on all pages served from the website.

### Script Details

For static HTML sites like this portfolio, the implementation consists of two parts:

1. **Analytics initialization** (inline script):
   ```javascript
   window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
   ```
   This creates a queue for analytics function calls before the script loads.

2. **Analytics script** (deferred):
   ```html
   <script defer src="/_vercel/insights/script.js"></script>
   ```
   This loads the Vercel analytics tracking script asynchronously.

Both scripts are placed in the `<body>` section of `index.html`, just before the closing `</body>` tag.

## Setup Requirements

### Prerequisites

- **Vercel Account**: Required to enable Web Analytics
- **Vercel Project**: The website must be deployed on Vercel
- **Dashboard Configuration**: Web Analytics must be enabled in the Vercel dashboard

### Deployment

To enable analytics:

1. Log in to your [Vercel dashboard](https://vercel.com/dashboard)
2. Select your project
3. Navigate to the **Analytics** tab
4. Click **Enable** to activate Web Analytics
5. Deploy your application

Once deployed, Vercel will automatically create the `/_vercel/insights/` routes needed for the tracking script to function.

## Limitations

This implementation does **not** require the `@vercel/analytics` package since it's a static HTML site. However, it also does not include route support - all page views are tracked equally without distinguishing between different routes.

For more advanced analytics features (custom events, route-specific tracking), consider upgrading to Vercel's Pro or Enterprise plans.

## Verification

When the site is deployed and working correctly, you should see:
- Fetch/XHR requests to `/_vercel/insights/view` in the browser's Network tab
- Data appearing in your Vercel dashboard's Analytics tab after a few days of traffic

## Privacy & Compliance

Vercel Web Analytics respects privacy standards including:
- No personally identifiable information (PII) collection
- Compliant with GDPR and other privacy regulations
- See [Vercel Privacy Policy](https://vercel.com/legal/privacy-policy) for more details

## Future Enhancements

To unlock additional features:
- Consider migrating to a framework (Next.js, React, etc.) to use the `@vercel/analytics` package
- This would enable custom event tracking for specific user interactions
- Route-level analytics would be automatically available
- Better integration with development workflow

## Resources

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Web Analytics Package Documentation](https://vercel.com/docs/analytics/package)
- [Analytics Filtering Guide](https://vercel.com/docs/analytics/filtering)
- [Custom Events Setup](https://vercel.com/docs/analytics/custom-events)
- [Analytics Pricing & Limits](https://vercel.com/docs/analytics/limits-and-pricing)
