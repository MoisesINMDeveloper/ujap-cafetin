import { useEffect, useState } from "react";
import {
  getPaymentOptions,
  createPaymentOption,
  updatePaymentOption,
  deletePaymentOption,
} from "../constant/Api";
import { InputLogin } from "./atoms/input";

export const PanelAdminMobilePayment = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [newPaymentOption, setNewPaymentOption] = useState({
    bank: "",
    code: "",
    cedula: "",
    phone: "",
  });
  const [editPaymentOption, setEditPaymentOption] = useState<any>(null);

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const fetchPaymentOptions = async () => {
    try {
      const options = await getPaymentOptions();
      setPaymentOptions(options);
    } catch (error) {
      console.error("Error fetching payment options:", error);
    }
  };

  const handleCreatePaymentOption = async () => {
    try {
      await createPaymentOption(newPaymentOption);
      fetchPaymentOptions();
      setNewPaymentOption({ bank: "", code: "", cedula: "", phone: "" });
    } catch (error) {
      console.error("Error creating payment option:", error);
    }
  };

  const handleUpdatePaymentOption = async () => {
    try {
      await updatePaymentOption(
        editPaymentOption.id,
        editPaymentOption.bank,
        editPaymentOption.code,
        editPaymentOption.cedula,
        editPaymentOption.phone
      );
      fetchPaymentOptions();
      setEditPaymentOption(null);
    } catch (error) {
      console.error("Error updating payment option:", error);
    }
  };

  const handleDeletePaymentOption = async (paymentId: number) => {
    try {
      await deletePaymentOption(paymentId);
      fetchPaymentOptions();
    } catch (error) {
      console.error("Error deleting payment option:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editPaymentOption) {
      setEditPaymentOption({ ...editPaymentOption, [name]: value });
    } else {
      setNewPaymentOption({ ...newPaymentOption, [name]: value });
    }
  };

  const inputFields = [
    { name: "bank", placeholder: "Banco" },
    { name: "code", placeholder: "Código" },
    { name: "cedula", placeholder: "Cédula" },
    { name: "phone", placeholder: "Teléfono" },
  ];

  return (
    <div className=" mx-2 mb-4 p-4 bg-transparent border-primary border-2 rounded-sm">
      <h1 className="text-white text-2xl text-center mb-4">Administrador de pagomovil</h1>
      <div className="mb-6 flex flex-col justify-center items-center">
        <h2 className="text-white text-center text-xl mb-6">
          {editPaymentOption ? "Editar opción de pago móvil" : "Agregar nueva opción de pago móvil"}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {inputFields.map((field) => (
            <InputLogin
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={
                editPaymentOption
                  ? editPaymentOption[field.name as keyof typeof editPaymentOption]
                  : newPaymentOption[field.name as keyof typeof newPaymentOption]
              }
              onChange={handleInputChange}
            />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          {editPaymentOption ? (
            <button
              className="bg-greenButton text-white p-2 rounded w-24"
              onClick={handleUpdatePaymentOption}
            >
              Actualizar
            </button>
          ) : (
            <button
              className="bg-primary text-white p-2 rounded w-24"
              onClick={handleCreatePaymentOption}
            >
              Agregar
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 ">
        <h2 className="text-white text-xl mb-2">Opciones de pago móvil</h2>
        {paymentOptions.map((option: any) => (
          <div key={option.id}>
            <div className="bg-transparent border-primary border-2 rounded-md p-4 mb-2 text-white flex flex-col gap-4">
              <p>
                {option.bank} - {option.code} - {option.cedula} - {option.phone}
              </p>
            </div>
            <div className="flex justify-center mt-5 gap-4">
              <button
                className="bg-tertiary text-white p-2 rounded mr-2 w-24"
                onClick={() => setEditPaymentOption(option)}
              >
                Editar
              </button>
              <button
                className="bg-redButton text-white p-2 rounded w-24"
                onClick={() => handleDeletePaymentOption(option.id)}
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
