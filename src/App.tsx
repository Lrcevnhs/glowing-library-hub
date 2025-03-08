
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAndPerformAutoDeletion } from "./utils/autoDeletion";

// Pages
import Index from "./pages/Index";
import Library from "./pages/Library";
import BorrowReturn from "./pages/BorrowReturn";
import AddBook from "./pages/AddBook";
import History from "./pages/History";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Check for auto-deletion on load and every hour
  useEffect(() => {
    // Check on initial load
    checkAndPerformAutoDeletion();
    
    // Check every hour
    const interval = setInterval(() => {
      checkAndPerformAutoDeletion();
    }, 3600000); // 1 hour in milliseconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/library" element={<Library />} />
            <Route path="/borrow-return" element={<BorrowReturn />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
