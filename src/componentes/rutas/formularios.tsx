import { Route, Routes, Navigate } from "react-router-dom";
import { FormularioLogin } from "./formularios/login";
import { FormRegister } from "./formularios/register";

export const Formularios = () => {
    return (
        <Routes>
            <Route path="login" element={<FormularioLogin />} />
            <Route path="register" element={<FormRegister />} />
        </Routes>
    )
}