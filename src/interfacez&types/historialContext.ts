import { ciudadesGuardadasProps } from "./ciudadGuardada";

export interface PropsHistorialContext {
    historial: ciudadesGuardadasProps[];
    setHistorial: React.Dispatch<React.SetStateAction<ciudadesGuardadasProps[]>>
}