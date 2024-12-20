import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ciudadesGuardadasProps } from "../interfacez&types/ciudadGuardada";
import { actualizarDataApp } from "../utils/estados";
import { useAppDispatch } from "../hooks";

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

  const [miLocalidad, setMiLocalidad]= useState<coordenadas>({ lat: 19.4326, lon: -99.1332});
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
      setMiLocalidad(datosGuardados)
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
      // const coordenadasPorDefecto = { lat: 19.4326, lon: -99.1332 };
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