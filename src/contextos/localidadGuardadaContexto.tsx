import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ciudadesGuardadasProps } from "../interfacez&types/ciudadGuardada";
import { actualizarDataApp } from "../utils/estados";
import { useAppDispatch } from "../hooks";
import { getMapa } from "../services/mapa";
import { getContaminacion } from "../services/contaminacion";

interface coordenadas {
  lat: number;
  lon: number;
}

interface Propsd {
  miLocalidad: coordenadas;
  setMiLocalidad: React.Dispatch<React.SetStateAction<coordenadas>>
}

export const MiLocalidadContexto = createContext<Propsd | null>(null);

export const LocalidadGuardada: React.FC<PropsWithChildren<{}>> = ({children}) => {

  const [miLocalidad, setMiLocalidad]= useState<coordenadas>({ lat: 16.868, lon: -99.894});
  const dispatch = useAppDispatch()

  const verificarLocalidadGuardada =  async () => {
    const localidadGuardada = localStorage.getItem('miLocalidad');
    if (localidadGuardada) {
      const { lat, lon } = JSON.parse(localidadGuardada);
      const coordenadas = { lat, lon }
      return coordenadas;
    }
  }
    
  const solicitarLocalizacion = async (): Promise<coordenadas | null> => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          const coordenadas: coordenadas = { lat: position.coords.latitude, lon: position.coords.longitude }
          resolve(coordenadas)
        }, (error) => {
          console.log(error)
          reject(null);
        })
      })
    } else {
      return null
    }
  }
  
  const iniciarApp = async () => {
    const datosGuardados = await verificarLocalidadGuardada();
    if (datosGuardados) {
      const { lat, lon } = datosGuardados;
      actualizarDataApp(lat, lon, dispatch);
      setMiLocalidad(datosGuardados);
      return;
    }

    try {
      const geolocalizacion = await solicitarLocalizacion();
      if (geolocalizacion) {
        const { lat, lon } = geolocalizacion;
        actualizarDataApp(lat, lon, dispatch);
        setMiLocalidad(geolocalizacion);
        localStorage.setItem('miLocalidad', JSON.stringify(geolocalizacion));
      } else {
        throw new Error('no se obtuvo geolocalizacion')
      }
    } catch(error) {
      actualizarDataApp(miLocalidad.lat, miLocalidad.lon, dispatch);
      localStorage.setItem('miLocalidad', JSON.stringify(miLocalidad));
    }
  }
    
  useEffect(() => {
    iniciarApp();
  }, []);

  return (
    <MiLocalidadContexto.Provider 
    value={{ miLocalidad, setMiLocalidad }}
    >
      {children}
    </MiLocalidadContexto.Provider>
  )
}