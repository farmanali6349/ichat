import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpaperContext";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";
import AppLoader from "./components/AppLoader";

function App() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <ThemeProvider>
      <WallpaperProvider>
        {isLoaded ? (
          <Routes>
            <Route
              path="/"
              element={
                isSignedIn ? <ChatPage /> : <Navigate to="/auth" replace />
              }
            />
            <Route
              path="/auth"
              element={isSignedIn ? <Navigate to="/" replace /> : <AuthPage />}
            />
          </Routes>
        ) : (
          <AppLoader />
        )}
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
