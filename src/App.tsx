
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import Housing from "./pages/Housing";
import Events from "./pages/Events";
import Donate from "./pages/Donate";
import Team from "./pages/Team";
import Mission from "./pages/Mission";
import SuccessStories from "./pages/SuccessStories";
import Partner from "./pages/Partner";
import Matchmaking from "./pages/Matchmaking";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin"; // Add the new Admin import
import PageTransition from "./components/layout/PageTransition";

// Create the query client
const queryClient = new QueryClient();

// AnimatedRoutes component to handle route transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/jobs" element={<PageTransition><Jobs /></PageTransition>} />
        <Route path="/housing" element={<PageTransition><Housing /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/matchmaking" element={<PageTransition><Matchmaking /></PageTransition>} />
        <Route path="/donate" element={<PageTransition><Donate /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/mission" element={<PageTransition><Mission /></PageTransition>} />
        <Route path="/success-stories" element={<PageTransition><SuccessStories /></PageTransition>} />
        <Route path="/partner" element={<PageTransition><Partner /></PageTransition>} />
        <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} /> {/* Add the new Admin route */}
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
