
const CartTotal=({total}: {total: number;}) => (
    <div className="mt-4 flex flex-row justify-between">
        <h3 className="text-lg font-bold text-gray-300">Monto</h3>
        <span>{total.toFixed(2)} USD</span>
    </div>
);

export default CartTotal;
