import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import './App.css';
import LevelUpPage from './pages/LevelUpPage';
import Login from './pages/Login';

function App() {
  const isAuthenticated = true;

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/game" /> : <LandingPage />
              }
            />
            <Route
              path="/redirect"
              element={isAuthenticated ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/game"
              element={isAuthenticated ? <GamePage /> : <Navigate to="/" />}
            />
            <Route
              path="/levelup"
              element={isAuthenticated ? <LevelUpPage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
