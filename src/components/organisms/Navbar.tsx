// Navbar.tsx

import {useState} from 'react';
import CartSidebar from './CartSideBar';
import {useCart} from '../../hooks/useCart';
import IconBurger from '../atoms/IconBurger';
import Title from '../atoms/common/Title';
import MenuNavbar from '../molecules/NavbarMenu';

const Navbar=() => {
  const [isCartOpen,setIsCartOpen]=useState(false);
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const {cartItems}=useCart();

  const handleIconBurgerClick: () => void=(): void => {
    console.log(isCartOpen);
    setIsCartOpen(!isCartOpen);
  };

  const handleNavbarMenuClick: () => void=(): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className='z-50 top-0 fixed lg:px-20 h-10 w-full flex flex-row-reverse justify-between items-center px-4 pt-2 bg-primary box-shadow text-black text-lg'>
        <div className='flex flex-row gap-2 mt-[-6px]'>
          <Title color='text-tertiary' title={'Cafetín'} />
          <IconBurger
            onClick={handleIconBurgerClick}
            productCount={cartItems.length}
          />
        </div>
        <MenuNavbar onClick={handleNavbarMenuClick} />
      </div>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={(): void => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
