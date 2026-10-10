import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpaperContext";
import { Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";

function App() {
  const { isSignedIn } = useAuth();
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route
            path="/"
            element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/auth"
            element={isSignedIn ? Navigate("/") : <AuthPage />}
          />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
