import { DetallesConIconos } from './detallesconiconos';
import '../stylesheet/weatherApp.scss';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';

import { Temperatura } from './temp';
import { LocalidadYDetalles } from './localidadyDetalles';
import { Pronostico } from './pronosticoCartas';
import { VientoYSol } from './vientoysol';
import { Buscador } from './buscador';
import { Alerta } from './alert';
import { Sidebar } from './sidebar';
import { actualizarDataApp } from '../utils/estados';
import { BtnAbrirSidebar } from './btnAbrirSidebar';
import { resolve } from 'path';

interface coordenadas {
  lat: number;
  lon: number;
}

export const WeatherApp = () => {
  const dispatch = useAppDispatch();

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
    console.log(geolocalizacion)
    if (geolocalizacion) {
      const { lat, lon } = geolocalizacion;
      actualizarDataApp(lat, lon, dispatch)
      localStorage.setItem('miLocalidad', JSON.stringify(geolocalizacion));
      console.log('coord del permiso llegó: ', lat, lon)
    } else {
      throw new Error('no se obtuvo geolocalizacion')
    }
    } catch(error) {
      const coordenadasPorDefecto = { lat: 19.4326, lon: -99.1332 };
      actualizarDataApp(coordenadasPorDefecto.lat, coordenadasPorDefecto.lon, dispatch);
      localStorage.setItem('miLocalidad', JSON.stringify(coordenadasPorDefecto))
      console.log('coord no llegaron')
    }
    
  }

  useEffect(() => {
    iniciarApp();
  }, []);

  return (
    <div className='App container-fluid'>
      <section className='encabezados'>
        <div className='primer-encabezado'>
          <Sidebar />
          <BtnAbrirSidebar />
          <Temperatura />
          <LocalidadYDetalles />
          <Buscador  />
        </div>
        <DetallesConIconos />
      </section>
      <section className='seccion-tablas'>
        <Pronostico />
        <VientoYSol />
      </section>
      <Alerta />
    </div>
  )
}