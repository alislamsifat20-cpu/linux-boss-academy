import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CourseRoadmap from "./pages/CourseRoadmap";
import Lesson from "./pages/Lesson";
import PracticeLab from "./pages/PracticeLab";
import Challenges from "./pages/Challenges";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardLayout from "./components/DashboardLayout";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/dashboard"}>
        {() => (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/roadmap"}>
        {() => (
          <DashboardLayout>
            <CourseRoadmap />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/lesson/:slug"}>
        {(params) => (
          <DashboardLayout>
            <Lesson slug={params.slug} />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/practice"}>
        {() => (
          <DashboardLayout>
            <PracticeLab />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/challenges"}>
        {() => (
          <DashboardLayout>
            <Challenges />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/leaderboard"}>
        {() => (
          <DashboardLayout>
            <Leaderboard />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/profile"}>
        {() => (
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/settings"}>
        {() => (
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        )}
      </Route>
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
