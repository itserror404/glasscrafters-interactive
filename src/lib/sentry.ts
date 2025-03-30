
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export const initSentry = () => {
  try {
    Sentry.init({
      dsn: "https://5d16b8e14a834d27649f1abba8199e1e@o4509064133935105.ingest.de.sentry.io/4509064281718864",
      integrations: [new BrowserTracing()],
      tracesSampleRate: 1.0, // Adjust this value in production
    });
    
    console.log('Sentry initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
};

// Export Sentry for use in other parts of the application
export { Sentry };
