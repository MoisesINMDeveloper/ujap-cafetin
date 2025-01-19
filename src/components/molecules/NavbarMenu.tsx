import {useState,useEffect,useRef} from 'react';
import {IoMdMenu,IoMdClose} from 'react-icons/io';
import ItemsMenu from '../atoms/ItemsMenu';
import ExtraInfo from '../atoms/ExtraInfo';

const MenuNavbar=({onClick}: {onClick: () => void}) => {
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const menuRef=useRef<HTMLDivElement>(null);

    const handleNavbarMenuClick: () => void=(): void => {
        setIsMenuOpen(!isMenuOpen);
        onClick();
    };

    useEffect((): () => void => {
        const handleClickOutside: (event: MouseEvent) => void=(event: MouseEvent): void => {
            if(menuRef.current&&!menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if(isMenuOpen) {
            document.addEventListener('mousedown',handleClickOutside);
        } else {
            document.removeEventListener('mousedown',handleClickOutside);
        }

        return (): void => {
            document.removeEventListener('mousedown',handleClickOutside);
        };
    },[isMenuOpen]);

    return (
        <div ref={menuRef} className="z-50 ">
            <div className="block lg:hidden">
                <button className="w-auto h-auto mb-2" onClick={handleNavbarMenuClick}>
                    {isMenuOpen? (
                        <IoMdClose className="w-8 h-8 text-tertiary transition-all duration-1000 transform rotate-190" />
                    ):(
                        <IoMdMenu className="w-8 h-8 text-tertiary transition-all duration-1000 transform rotate-0" />
                    )}
                </button>
                {isMenuOpen&&(
                    <ItemsMenu />
                )}
            </div>
            <div className="hidden lg:block">
                <ExtraInfo />
            </div>
        </div>
    );
};

export default MenuNavbar;
