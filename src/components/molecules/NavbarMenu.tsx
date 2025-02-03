import { useState, useEffect, useRef } from 'react';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { useLocation } from 'react-router-dom';  // Importar useLocation
import ItemsMenu from '../atoms/ItemsMenu';
import ExtraInfo from '../atoms/ExtraInfo';
import SideBar from './sidebar';

interface MenuNavbarProps {
  onClick: () => void;
  setActiveView: (view: string) => void;
}

const MenuNavbar = ({ onClick, setActiveView }: MenuNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation(); // Obtener la ubicación actual

  const handleNavbarMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    onClick();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef} className="z-50">
      <div className="block lg:hidden">
        <button className="w-auto h-auto mb-2" onClick={handleNavbarMenuClick}>
          {isMenuOpen ? (
            <IoMdClose className=" w-8 h-8 text-tertiary transition-all duration-1000 transform rotate-190" />
          ) : (
            <IoMdMenu className=" w-8 h-8 text-tertiary transition-all duration-1000 transform rotate-0" />
          )}
        </button>
        {isMenuOpen && (
          <>
            {location.pathname === '/ujap-cafetin/#/administration-panel' && (
              <SideBar setActiveView={setActiveView} />
            )}
            {location.pathname === '/ujap-cafetin/' && <ItemsMenu />}

          </>
        )}
      </div>
      <div className='hidden lg:block'>
            <ExtraInfo />
      </div>
    </div>
  );
};

export default MenuNavbar;
