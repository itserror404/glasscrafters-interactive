
// Mock Sentry implementation for when packages aren't available
const mockSentry = {
  init: () => console.log('Mock Sentry initialized (packages not installed)'),
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
};

// Export a safe version of Sentry that works whether the package is installed or not
export const Sentry = (() => {
  try {
    // Try to import the real Sentry, but if it fails, use the mock
    require('@sentry/react');
    return require('@sentry/react');
  } catch (e) {
    console.warn('Sentry packages not installed, using mock implementation');
    return mockSentry;
  }
})();

export const initSentry = () => {
  try {
    let browserTracing;
    try {
      // Try to import BrowserTracing, but continue if it fails
      const sentryTracing = require('@sentry/tracing');
      browserTracing = new sentryTracing.BrowserTracing();
    } catch (e) {
      console.warn('Sentry tracing package not installed, skipping BrowserTracing');
    }

    // Initialize with or without tracing
    Sentry.init({
      dsn: "https://5d16b8e14a834d27649f1abba8199e1e@o4509064133935105.ingest.de.sentry.io/4509064281718864",
      integrations: browserTracing ? [browserTracing] : [],
      tracesSampleRate: 1.0, // Adjust this value in production
    });
    
    console.log('Sentry initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Sentry:', error);
  }
};
