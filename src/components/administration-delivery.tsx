import React, { useState, useEffect } from 'react';
import { InputLogin } from './atoms/input';
import { getDeliveryOptions, createDeliveryOption, updateDeliveryOption, deleteDeliveryOption } from '../constant/Api';

const PanelAdminDelivery = () => {
    const [zones, setZones] = useState([{ id: 0, name: '', fee: 0 }]);
    const [newZone, setNewZone] = useState({ name: '', fee: 0 });
    const [editZone, setEditZone] = useState<any>(null);

    useEffect(() => {
        fetchDeliveryZones();
    }, []);

    const fetchDeliveryZones = async () => {
        try {
            const fetchedZones = await getDeliveryOptions();
            setZones(fetchedZones);
        } catch (error) {
            console.error("Error fetching delivery zones:", error);
        }
    };

    const handleAddZone = async () => {
        try {
            await createDeliveryOption(newZone);
            fetchDeliveryZones();
            setNewZone({ name: '', fee: 0 });
        } catch (error) {
            console.error("Error creating delivery zone:", error);
        }
    };

    const handleUpdateZone = async () => {
        try {
            await updateDeliveryOption(editZone.id, editZone.name, editZone.fee);
            fetchDeliveryZones();
            setEditZone(null);
        } catch (error) {
            console.error("Error updating delivery zone:", error);
        }
    };

    const handleRemoveZone = async (zoneId: number) => {
        try {
            await deleteDeliveryOption(zoneId);
            fetchDeliveryZones();
        } catch (error) {
            console.error("Error deleting delivery zone:", error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const parsedValue = name === 'fee' ? (value === '' ? 0 : parseFloat(value)) : value;
        if (editZone) {
            setEditZone({ ...editZone, [name]: parsedValue });
        } else {
            setNewZone({ ...newZone, [name]: parsedValue });
        }
    };

    return (
        <div className="p-4 bg-transparent border-primary border-2 rounded-sm mb-10">
            <h1 className="text-white text-2xl mb-4 text-left">Administrador de delivery</h1>
            <div className="mb-6 flex flex-col justify-center items-center">
                <h2 className="text-white text-xl mb-6 text-left">
                    {editZone ? "Editar zona de delivery" : "Agregar nueva zona de delivery"}
                </h2>
                <div className="flex flex-row gap-4 mb-4">
                    <InputLogin
                        type="text"
                        name="name"
                        placeholder="Nombre de la zona"
                        value={editZone ? editZone.name : newZone.name}
                        onChange={handleInputChange}
                    />
                    <InputLogin
                        type="text"
                        name="fee"
                        placeholder="Tarifa"
                        value={editZone ? editZone.fee : newZone.fee}
                        onChange={handleInputChange}
                    />
                    <button
                        className={`${editZone ? "bg-greenButton" : "bg-primary"} text-white p-2 rounded w-24`}
                        onClick={editZone ? handleUpdateZone : handleAddZone}
                    >
                        {editZone ? "Actualizar" : "Agregar"}
                    </button>
                </div>
            </div>
            <h2 className="text-white text-xl mb-2 text-center">Zonas de delivery</h2>
            <div className="flex flex-wrap items-center justify-center gap-6 mx-4">
                {zones.map((zone) => (
                    <div key={zone.id}>
                        <div className="bg-transparent  border-primary border-2 rounded-md p-4 mb-2 text-white flex flex-row gap-4">
                            <p>{zone.name}</p>
                            <p>Tarifa: {zone.fee}</p>
                        </div>
                        <div className="flex justify-center my-5 gap-4">
                            <button
                                className="bg-greenButton text-white p-2 rounded mr-2 w-24"
                                onClick={() => setEditZone(zone)}
                            >
                                Editar
                            </button>
                            <button
                                className="bg-redButton text-white p-2 rounded w-24"
                                onClick={() => handleRemoveZone(zone.id)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PanelAdminDelivery;