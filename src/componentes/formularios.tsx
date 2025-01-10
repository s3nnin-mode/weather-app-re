import { Route, Routes, Navigate } from "react-router-dom"
import { FormularioLogin } from "./rutas/login"
import { FormRegister } from "./rutas/register"

export const Formularios = () => {
    return (
        <Routes>
            <Route path="login" element={<FormularioLogin />} />
            <Route path="register" element={<FormRegister />} />
        </Routes>
    )
}