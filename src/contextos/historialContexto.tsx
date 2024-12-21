import React, { createContext, useState, PropsWithChildren } from "react";
import { ciudadesGuardadasProps } from "../interfacez&types/ciudadGuardada";
import { PropsHistorialContext } from "../interfacez&types/historialContext";

export const HistorialContext = createContext<PropsHistorialContext | null>(null);

export const HistorialDeNavegacion: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [historial, setHistorial] = useState<ciudadesGuardadasProps[]>([]);

  return (
    <HistorialContext.Provider value={{ historial, setHistorial }}>
      {children}
    </HistorialContext.Provider>
  )
}