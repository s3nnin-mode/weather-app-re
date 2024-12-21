import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { actualizarDataApp } from "./estados";

const dispatch = useAppDispatch();

interface coordenadas {
    lat: number;
    lon: number;
}

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
      return;
    }

    try {
      const geolocalizacion = await solicitarLocalizacion();
      if (geolocalizacion) {
        const { lat, lon } = geolocalizacion;
        actualizarDataApp(lat, lon, dispatch)
        localStorage.setItem('miLocalidad', JSON.stringify(geolocalizacion));
      } else {
        throw new Error('no se obtuvo geolocalizacion')
      }
    } catch(error) {
      const coordenadasPorDefecto = { lat: 19.4326, lon: -99.1332 };
      actualizarDataApp(coordenadasPorDefecto.lat, coordenadasPorDefecto.lon, dispatch);
      localStorage.setItem('miLocalidad', JSON.stringify(coordenadasPorDefecto))
    }
    
  }

  useEffect(() => {
    iniciarApp();
  }, []);
