import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import "./App.css";
import LevelUpPage from "./pages/LevelUpPage";
import CharacterSelect from "./pages/CharacterSelect";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { GameContextProvider } from "./context/GameContext";
import { ThemeProvider } from "./context/ThemeContext";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/levelup"
          element={
            <ProtectedRoute>
              <LevelUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/character-select"
          element={
            <ProtectedRoute>
              <CharacterSelect />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameContextProvider>
          <ThemeProvider colorMode="darkOnLight">
            <Root />
          </ThemeProvider>
        </GameContextProvider>
      </header>
    </div>
  );
}
