import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // 👈 Usa HashRouter
import PanelAdmin from './templates/Panel-Administrador';
import Dashboard from './templates/Dashboard';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import './App.css';
import { useState } from 'react';
import LoginAdministrador from './templates/LoginAdministrador';

export default function App() {
  const [activeView, setActiveView] = useState<string>('PRODUCTOS');

  return (
    <Router> {/* 👈 HashRouter no necesita basename */}
      <div className="flex flex-col min-h-screen relative">
        <Navbar setActiveView={setActiveView} />
        <main className="relative flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* 👈 No es necesario poner /cafetin-ujap */}
            <Route path="/login-administration" element={<LoginAdministrador />} />
            <Route
              path="/administration-panel"
              element={<PanelAdmin activeView={activeView} setActiveView={setActiveView} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
