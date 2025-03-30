
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export const initSentry = () => {
  Sentry.init({
    dsn: "YOUR_SENTRY_DSN", // Replace with your actual Sentry DSN
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0, // Adjust this value in production
  });
};
