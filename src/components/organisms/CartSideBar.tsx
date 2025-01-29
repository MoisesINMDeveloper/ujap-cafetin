import {useEffect,useRef,useState} from 'react';
import PaymentModal from '../modals/PaymentModal';
import NotificationComponent from "../modals/Notification";
import CartCommentsComponent from '../atoms/CartComments';
import Button from '../atoms/common/Button';
import CloseCartIcon from '../atoms/CloseCartIcon';
import CartTotal from '../atoms/CartTotal';
import CartItem from '../atoms/CartItem';
import {useCart} from '../../hooks/useCart';
import data from '../../constant/data';
import DeliveryOptionModal from '../modals/DeliveryOptionModal';
import ButtonDelivery from '../atoms/common/ButtonDelivery';
import {TbBasketCancel} from 'react-icons/tb';

const CartSidebar=({isOpen,onClose}: {isOpen: boolean; onClose: () => void;}) => {
    const {cartItems,updateQuantity,removeFromCart}=useCart();
    const sidebarRef=useRef<HTMLDivElement>(null);
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [isNotificationVisible,setIsNotificationVisible]=useState(false);
    const [comment,setComment]=useState("");
    const [deliveryFee,setDeliveryFee]=useState<number>(0);
    const [deliveryLocation,setDeliveryLocation]=useState<string>('');
    const [isDeliveryOptionOpen,setIsDeliveryOptionOpen]=useState(false);

    const total: number=cartItems.reduce(
        (acc: number,item): number => acc+(item.product.price*item.quantity),
        0
    )+deliveryFee;

    useEffect((): () => void => {
        const handleClickOutside: (event: MouseEvent) => void=(event: MouseEvent): void => {
            if(
                sidebarRef.current&&
                !sidebarRef.current.contains(event.target as Node)&&
                !isDeliveryOptionOpen
            ) {
                onClose();
            }
        };

        if(isOpen) {
            document.addEventListener('mousedown',handleClickOutside);
        } else {
            document.removeEventListener('mousedown',handleClickOutside);
        }

        return (): void => {
            document.removeEventListener('mousedown',handleClickOutside);
        };
    },[isOpen,onClose,isDeliveryOptionOpen]);

    const handlePaymentClick: () => void=(): void => {
        const orderSummary: string=cartItems.map(item => `${item.quantity} ${item.product.title}`).join(', ');
        const orderInfo={
            orderSummary,
            monto: total.toFixed(2),
            comment,
            delivery: deliveryLocation!==''? deliveryLocation:'No',
        };
        localStorage.setItem('cartInfo',JSON.stringify(orderInfo));
        setIsModalOpen(true);
        onClose();
    };

    const handleConfirm: (referenceNumber: string) => void=(referenceNumber: string): void => {
        setIsModalOpen(false);
        setIsNotificationVisible(true);

        setTimeout((): void => setIsNotificationVisible(false),5000);

        setTimeout((): void => {
            const cartInfo=JSON.parse(localStorage.getItem('cartInfo')!);
            const phoneNumber=`${data?.paydates?.phone}`;
            const message=`Hola ${data?.contactData[0]?.name}, aqui dejo mi pedido y referencia, quedo atento.\n\nDetalles del pedido:\n${cartInfo.orderSummary}\nMonto: USD - ${parseFloat(cartInfo.monto).toFixed(2)} $\nComentario: ${cartInfo.comment}\nServicio de delivery: ${cartInfo.delivery}\nReferencia: ${referenceNumber}`;
            const whatsappLink=`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappLink,'_blank');
            localStorage.removeItem('cartInfo');
        },5000);
    };

    const handleRemoveDelivery=() => {
        setDeliveryFee(0);
        setDeliveryLocation('');
    };

    return (
        <>
            <div ref={sidebarRef} className={`fixed z-40 top-10 right-0 h-auto w-80 border-2 border-t-0 rounded-lg rounded-t-none border-primary text-gray-300 bg-[#000000] shadow-lg transition-transform transform ${isOpen? 'translate-x-0':'translate-x-full'}`}>
                <div className='flex flex-row justify-between items-center p-4 absolute right-0'>
                    <CloseCartIcon onClick={onClose} />
                </div>
                <div className="pt-2 pl-4">
                    <ButtonDelivery color="w-full text-lg mt-2" onClick={(): void => setIsDeliveryOptionOpen(true)} label={'Cambiar servicio de delivery'} />
                </div>
                <div className="p-4 pt-4">
                    <h2 className="text-xl font-bold mb-4">Cesta de pedido</h2>
                    <ul className='overflow-y-auto max-h-60'>
                        {cartItems.map(item => (
                            <CartItem key={item.product.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                        ))}
                        {deliveryLocation&&(
                            <li className='flex flex-row justify-between items-center'>
                                <div>
                                    <p className="font-semibold">Services - {deliveryLocation}</p>
                                    <span>USD - {deliveryFee.toFixed(2)} $</span>
                                </div>
                                <button onClick={handleRemoveDelivery} className="text-red-500  px-2"><TbBasketCancel className='h-5 w-5' /></button>
                            </li>
                        )}
                    </ul>
                    <CartTotal total={total} />
                    <CartCommentsComponent comment={comment} setComment={setComment} />
                    <Button color="w-full text-lg" onClick={handlePaymentClick} label={'Generar pedido'} />
                </div>
            </div>
            {isModalOpen&&<PaymentModal total={total} onConfirm={handleConfirm} onClose={(): void => setIsModalOpen(false)} />}
            {isNotificationVisible&&<NotificationComponent />}
            {isDeliveryOptionOpen&&<DeliveryOptionModal isOpen={isDeliveryOptionOpen} onClose={(): void => setIsDeliveryOptionOpen(false)} setDeliveryFee={setDeliveryFee} setDeliveryLocation={setDeliveryLocation} />}
        </>
    );
};

export default CartSidebar;
