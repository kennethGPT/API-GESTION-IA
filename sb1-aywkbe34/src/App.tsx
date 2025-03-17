import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import WelcomePage from './components/WelcomePage';
import ChatPage from './components/ChatPage';
import BulkMessagePage from './components/BulkMessagePage';
import PricingPage from './components/PricingPage';

// Test users database with username support
export const TEST_USERS = [
  { username: 'admin', email: 'admin@test.com', password: 'admin' },
  { username: 'kenneth', email: 'kenneth@ia.com', password: 'kenneth' },
  { username: 'bolt', email: 'bolt@ia.com', password: 'bolt' },
  { username: 'joser', email: 'joser@demo.com', password: 'JoseR' },
  { username: 'gabriela', email: 'gabriela@demo.com', password: 'Gaby' },
  { username: 'demo', email: 'demo@ia.com', password: 'demo' },
];

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/bulk-message" element={<BulkMessagePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;