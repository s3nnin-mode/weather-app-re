import { ciudadesGuardadasProps } from "./ciudadGuardada";

export interface PropsLocalidadLi {
    country?: string;
    lat: number;
    lon: number;
    name: string;
    state?: string;
    esHistorial?: boolean;
    esConfig?: boolean;
    retornarUbicacion?: (props: PropsLocalidadLi) => void;
    actualizarCiudades?: (props: ciudadesGuardadasProps[]) => void;
}