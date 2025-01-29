import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { getDeliveryOptions } from '../../constant/Api';

interface DeliveryOption {
    id: number;
    name: string;
    fee: number;
}

interface DeliveryOptionModalProps {
    setDeliveryFee: Dispatch<SetStateAction<number>>;
    setDeliveryLocation: Dispatch<SetStateAction<string>>;
    isOpen: boolean;
    onClose: () => void;
}

const DeliveryOptionModal = ({ setDeliveryFee, setDeliveryLocation, isOpen, onClose }: DeliveryOptionModalProps) => {
    const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
    const [selectedDelivery, setSelectedDelivery] = useState('');

    // Fetch delivery options from API
    useEffect(() => {
        const fetchDeliveryOptions = async () => {
            try {
                const response = await getDeliveryOptions()
                setDeliveryOptions(response);
            } catch (error) {
                console.error('Error fetching delivery options:', error);
            }
        };

        if (isOpen) {
            fetchDeliveryOptions();
        }
    }, [isOpen]);

    const handleDeliveryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        setSelectedDelivery(selectedOption);

        const deliveryOption = deliveryOptions.find(option => option.name === selectedOption);
        if (deliveryOption) {
            setDeliveryFee(deliveryOption.fee);
            setDeliveryLocation(deliveryOption.name);
        } else {
            setDeliveryFee(0);
            setDeliveryLocation('');
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-black border-2 border-primary rounded-lg p-6 w-72 shadow-lg">
                    <label className="flex flex-col space-y-2">
                        <h2 className="text-xl font-bold mb-4 text-gray-300">Seleccione la región</h2>
                        <select
                            value={selectedDelivery}
                            onChange={handleDeliveryChange}
                            className="form-select mt-1 block w-full outline-none bg-black text-fourth border-primary border-2 shadow-sm focus:ring-opacity-50"
                        >
                            <option className="text-fourth" value="">
                                Ninguno
                            </option>
                            {deliveryOptions.map((option, index) => (
                                <option key={index} value={option.name}>
                                    {option.name} ( {option.fee.toFixed(2)} USD. )
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="mt-4 flex justify-end space-x-2">
                        <button onClick={onClose} className="px-4 py-2 bg-gray-700 text-white rounded-md active:bg-primary">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </>
    );
};

export default DeliveryOptionModal;
