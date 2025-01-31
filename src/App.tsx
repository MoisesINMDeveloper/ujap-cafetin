import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PanelAdmin from './templates/Panel-Administrador'; // Ajusta según sea necesario
import Dashboard from './templates/Dashboard';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import './App.css';
import { useState } from 'react';
import LoginAdministrador from './templates/LoginAdministrador';

interface PanelAdminProps {
  activeView: string;
  setActiveView: (view: string) => void;
}
export default function App() {
  const [activeView, setActiveView] = useState<string>('PRODUCTOS'); // Estado para gestionar la vista activa

  return (
    <Router>
      <div className='flex flex-col min-h-screen relative'>
        <Navbar setActiveView={setActiveView} /> {/* Pasa setActiveView aquí */}
        <main className='relative flex-1'>
          <Routes>
            <Route path="/cafetin-ujap" element={<Dashboard />} />
            <Route path='/cafetin-ujap/login-administration' element={<LoginAdministrador/>} />
            <Route
              path="/cafetin-ujap/administration-panel"
              element={<PanelAdmin activeView={activeView} setActiveView={setActiveView} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
