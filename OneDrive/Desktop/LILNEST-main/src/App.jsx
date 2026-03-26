import React from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";
import SOSButton from './components/ui/SOSButton';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="theme-transition">
          <Routes />
          <SOSButton />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;