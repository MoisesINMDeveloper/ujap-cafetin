import { FaShop } from "react-icons/fa6";
import {useCart} from '../../hooks/useCart';

const IconBurger=({
  onClick,
  productCount,
}: {
  onClick: () => void;
  productCount: number;
}) => {
  const {getTotalItems}=useCart();

  return (
    <button className='w-auto h-auto ' onClick={onClick}>
      <FaShop className='mr-2 top-2 w-6 h-6 active:text-secundary text-tertiary' />
      {productCount>0&&(
        <span className='absolute top-3 right-4 lg:right-20  bg-secundary rounded-full w-4 h-4 text-xs flex items-center justify-center text-black font-bold'>
          {getTotalItems()}
        </span>
      )}
    </button>
  );
};

export default IconBurger;
