
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Roadmap from "./pages/Roadmap";
import ProgressPage from "./pages/Progress";
import NotesPage from "./pages/Notes";
import CalendarPage from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import InterviewPage from "./pages/Interview";
import VideoConferencePage from "./pages/VideoConference";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/video-conference" element={<VideoConferencePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
