import React from "react";
import { ciudadesGuardadasProps } from "./ciudadGuardada";

interface coordenadas {
    lat: number;
    lon: number;
}

export interface PropsHistorialContext {
    historial: ciudadesGuardadasProps[];
    setHistorial: React.Dispatch<React.SetStateAction<ciudadesGuardadasProps[]>>;
    agregarLocalidadAHistorial: (props: ciudadesGuardadasProps) => void;
    borrarLocalidadDeHistorial: (props: coordenadas) => void;
    cargarHistorial: () => void;
}