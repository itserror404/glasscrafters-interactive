
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

export const initSentry = () => {
  Sentry.init({
    dsn: "https://5d16b8e14a834d27649f1abba8199e1e@o4509064133935105.ingest.de.sentry.io/4509064281718864", // Replace with your actual Sentry DSN
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0, // Adjust this value in production
  });
};
