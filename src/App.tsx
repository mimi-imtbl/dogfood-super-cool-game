import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GamePage from './pages/GamePage';
import './App.css';

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
              path="/game"
              element={isAuthenticated ? <GamePage /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
