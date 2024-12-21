import { ciudadesGuardadasProps } from "./ciudadGuardada";

export interface PropsLocalidadLi {
    country?: string;
    lat: number;
    lon: number;
    name: string;
    state?: string;
    esHistorial?: boolean;
    esConfig?: boolean;
    // actualizarCiudades?: (props: ciudadesGuardadasProps[]) => void;
}