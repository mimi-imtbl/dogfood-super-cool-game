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
import { usePassportClient } from './hooks/usePassportClient';
import { config } from '@imtbl/sdk';
import { useState, useEffect } from 'react';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { passport } = usePassportClient({
    environment: config.Environment.SANDBOX,
  });

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await passport?.getUserInfo();
        console.log('userInfo', userInfo);
        if (userInfo) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn('passport getUserInfo error', error);
      }
    };
    getUserInfo();
  }, [passport]);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/game" replace />
                ) : (
                  <LandingPage setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/game"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <GamePage setIsAuthenticated={setIsAuthenticated} />
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
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
