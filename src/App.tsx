import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import GamePage from "./pages/GamePage";
import "./App.css";
import LevelUpPage from "./pages/LevelUpPage";
import CharacterSelect from "./pages/CharacterSelect";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { GameContextProvider, useGameContext } from "./context/GameContext";
import { Audio } from "./components/Audio";
import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";

const Root = () => {
  const { isAuthenticated } = useGameContext();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/game" replace /> : <LandingPage />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <GamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/levelup"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <LevelUpPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/character-select"
          // element={isAuthenticated ? <CharacterSelect /> : <Navigate to="/" />}
          element={<CharacterSelect />}
        />
      </Routes>
    </Router>
  );
};

export default function App() {
  const [playAudio, setPlayAudio] = useState(false);

  return (
    <div className="App">
      <button onClick={() => setPlayAudio(!playAudio)}>Toggle Audio</button>
      <Audio playAudio={playAudio}></Audio>;
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
