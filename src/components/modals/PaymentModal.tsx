import { useState, ChangeEvent, useEffect } from 'react';
import { IoMdCopy } from 'react-icons/io';
import { PayDates } from '../../constant/data';
import InfoRow from '../atoms/common/InfoRow';
import Button from '../atoms/common/Button';
import { getPaymentOptions } from '../../constant/Api';

interface PaymentModalProps {
    total: number;
    onConfirm: (referenceNumber: string) => void;
    onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ total, onConfirm, onClose }) => {
    const [paymentData, setPaymentData] = useState<PayDates[]>([]);
    const [referenceNumber, setReferenceNumber] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentData = async () => {
            try {
                const response = await getPaymentOptions();
                setPaymentData(response||[]);
            } catch (err) {
                console.error('Error fetching payment options:', err);
                setError('No se pudo cargar la información de pago. Intenta nuevamente más tarde.');
            }
        };
        fetchPaymentData();
    }, []);

    const handleCopy = (): void => {
        if (paymentData.length === 0) return;

        const { bank, code, cedula, phone } = paymentData[0];

        const textToCopy = `
            Banco: ${bank}
            Código: ${code}
            Cédula: ${cedula}
            Teléfono: ${phone}
            Monto: ${total.toFixed(2)}
        `;
        navigator.clipboard.writeText(textToCopy);
    };

    if (error) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-screen border-2 border-primary text-gray-300 bg-[#000000c2] p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-red-500">Error</h2>
                    <p>{error}</p>
                    <Button onClick={onClose} label="Cerrar" color="bg-red-500 active:bg-fourth text-white" />
                </div>
            </div>
        );
    }

    if (paymentData.length === 0) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-screen border-2 border-primary text-gray-300 bg-[#000000c2] p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">Cargando...</h2>
                </div>
            </div>
        );
    }

    const { bank, code, cedula, phone } = paymentData[0];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-screen border-2 border-primary text-gray-300 bg-[#000000c2] p-4 rounded-lg shadow-lg">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-xl font-bold mb-4">Información de Pago</h2>
                    <IoMdCopy className="mb-4 w-6 h-6 cursor-pointer active:text-primary" onClick={handleCopy} />
                </div>
                <div className="flex flex-col justify-center items-center">
                    <strong className="underline">ADVERTENCIA</strong>
                    <p className="text-gray-300 text-sm justify-center mb-2">
                        Asegúrate de consultar disponibilidad de los productos antes de realizar el pago.
                    </p>
                </div>
                <InfoRow label="Banco" value={bank} />
                <InfoRow label="Código" value={code} />
                <InfoRow label="Cédula" value={cedula} />
                <InfoRow label="Teléfono" value={phone} />
                <InfoRow label="Monto" value={`Bs. ${total.toFixed(2)}`} />
                <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setReferenceNumber(e.target.value)}
                    placeholder="Número de referencia"
                    className="w-full p-2 mt-4 mb-4 border rounded border-primary bg-transparent outline-none"
                />
                <div className="flex justify-center space-x-2">
                    <Button
                        onClick={(): void => onConfirm(referenceNumber)}
                        label="Confirmar"
                        color="bg-green-500 active:bg-secondary text-white"
                    />
                    <Button onClick={onClose} label="Cancelar" color="bg-red-500 active:bg-fourth text-white" />
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
