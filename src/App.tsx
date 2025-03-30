
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initSentry, Sentry } from "./lib/sentry";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Initialize Sentry
initSentry();

// Create a new query client
const queryClient = new QueryClient();

// Define our application component
const App = () => (
  <Sentry.ErrorBoundary fallback={({ error }) => (
    <div>An error occurred: {error.message}</div>
  )}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Sentry.ErrorBoundary>
);

export default App;
