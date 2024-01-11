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
import CharacterSelect from './pages/CharacterSelect';
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { GameContextProvider, useGameContext } from "./context/GameContext";

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
              element={isAuthenticated ? <CharacterSelect /> : <Navigate to="/" />}
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
          <Root />
        </GameContextProvider>
      </header>
    </div>
  );
}
