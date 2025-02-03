import { InputLogin } from "../components/atoms/input";
import { useState } from "react";
import { loginAdmin } from "../constant/Api";
import { useNavigate } from "react-router-dom";

const LoginAdministrador=() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await loginAdmin(username, password);
            console.log(data);
            sessionStorage.setItem("token", data.token);
            navigate("/administration-panel")
        } catch (error) {
            console.error(error);
        }
    };

    const input = [
        { type: "text", name: "Usuario administrador", placeholder: "Usuario administrador", value: username, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) },
        { type: "password", name: "Contraseña Administrador", placeholder: "Contraseña Administrador", value: password, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value) },
    ];

    return (
        <div className=" h-[calc(100vh-186px)] w-full relative flex flex-col items-center justify-evenly bg-black">
            <h1 className="text-white text-2xl font-bold">Ingresar al administrador</h1>
            <form className="flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
                {input.map((input, index) => (
                    <InputLogin key={index} type={input.type} name={input.name} placeholder={input.placeholder} value={input.value} onChange={input.onChange} />
                ))}
                <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded">Enviar</button>
            </form>
        </div>
    )
}
export default LoginAdministrador;