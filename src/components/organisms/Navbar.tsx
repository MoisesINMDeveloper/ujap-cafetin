import { useState } from 'react';
import CartSidebar from './CartSideBar';
import { useCart } from '../../hooks/useCart';
import IconBurger from '../atoms/IconBurger';
import Title from '../atoms/common/Title';
import MenuNavbar from '../molecules/NavbarMenu';

interface NavbarProps {
  setActiveView: (view: string) => void;
}

const Navbar = ({ setActiveView }: NavbarProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <>
      <div className="z-50 top-0 fixed lg:px-20 h-14 w-full flex flex-row-reverse justify-between items-center px-4 pt-2 bg-primary box-shadow text-black text-lg">
        <div className="flex flex-row gap-2 mt-[-6px]">
          <Title color="text-tertiary" title={'Cafetín'} />
          <IconBurger onClick={() => setIsCartOpen(!isCartOpen)} productCount={cartItems.length} />
        </div>
        <MenuNavbar onClick={() => {}} setActiveView={setActiveView} />
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
