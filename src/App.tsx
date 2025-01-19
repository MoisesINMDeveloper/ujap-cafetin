import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Dashboard from './templates/Dashboard';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import './App.css';
import PanelAdmin from './templates/Panel-Administrador';
import LoginAdministrador from './templates/LoginAdministrador';
export default function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen relative'>
        <Navbar />
        <main className='relative flex-1'>
          <Routes>
            <Route path="/cafetin-ujap" element={<Dashboard />} />
            <Route path="/cafetin-ujap/administration-panel" element={<PanelAdmin />} />
            <Route path="/cafetin-ujap/login-administration" element={<LoginAdministrador />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
