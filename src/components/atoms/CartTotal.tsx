
const CartTotal=({total}: {total: number;}) => (
    <div className="mt-4 flex flex-row justify-between">
        <h3 className="text-lg font-bold text-gray-300">Monto</h3>
        <span>USD - {total.toFixed(2)}</span>
    </div>
);

export default CartTotal;
