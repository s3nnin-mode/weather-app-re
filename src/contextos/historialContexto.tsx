import React, { createContext, useState, PropsWithChildren, useEffect } from "react";
import { ciudadesGuardadasProps } from "../interfacez&types/ciudadGuardada";
import { PropsHistorialContext } from "../interfacez&types/historialContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserInfo, updateHistory } from "../services/firebaseConfig";

export const HistorialContext = createContext<PropsHistorialContext | null>(null);

export const HistorialDeNavegacion: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [historial, setHistorial] = useState<ciudadesGuardadasProps[]>([]);

  const usuarioAutenticado = async () => {
    return new Promise((resolve) => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      })
    });
  }

  const borrarLocalidadDeHistorial = async ({ lat, lon }: { lat: number, lon: number}) => {
    const historialActualizado = historial.filter(el => (el.lat !== lat) && (el.lon !== lon));
    setHistorial(historialActualizado);
    localStorage.setItem('ciudadesVisitadas', JSON.stringify(historialActualizado));
    const usuarioLogeado = await usuarioAutenticado();
    if (usuarioLogeado) {
      updateHistory(historialActualizado);
    }
  }

  const agregarLocalidadAHistorial = async (ciudad: ciudadesGuardadasProps) => {
    const limiteAlcanzado = historial.some(city => city.lat === ciudad.lat && city.lon === ciudad.lon);
    if (limiteAlcanzado) {
      return;
    }

    const nuevoHistorial = [...historial, ciudad];
    console.log('nuevi historial', nuevoHistorial)
    setHistorial(nuevoHistorial);      //React no tiene forma de saber cuando cambia el localstorage y firebase, por eso uso estos datos a nivel local para que estén sincronizados con el localstorage o firebase
    localStorage.setItem('ciudadesVisitadas', JSON.stringify(nuevoHistorial));

    const usuarioLogeado = await usuarioAutenticado();
    if (usuarioLogeado) {
      updateHistory(nuevoHistorial);
      // actualizarHistorial({city: city || '', state: state || '', country: country || '', lat, lon});
    }
  }

  const cargarHistorial = async () => {
    const usuarioLogeado = await usuarioAutenticado();
    if (usuarioLogeado) {
      const data = await getUserInfo();
      if (data) {
        console.log('historial de user: ', Object(data).history)
        setHistorial(data.history);
        return;
      }
    }

    const ciudadesGuardadas = localStorage.getItem('ciudadesVisitadas');
    if (ciudadesGuardadas) {                                        //Si existe un historial en el localstorage 
      setHistorial(JSON.parse(ciudadesGuardadas));               //se actualiza el estado con esos datos   
    } else {
      localStorage.setItem('ciudadesVisitadas', JSON.stringify([]));    //De lo contrario se crea un array para almacenar su historial
      setHistorial([]);
    }
  }

  useEffect(() => {
    cargarHistorial();
  }, []);

  return (
    <HistorialContext.Provider value={{cargarHistorial, historial, setHistorial, agregarLocalidadAHistorial, borrarLocalidadDeHistorial }}>
      {children}
    </HistorialContext.Provider>
  )
}