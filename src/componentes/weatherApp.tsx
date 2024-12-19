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

  const solicitarLocalizacion = () => {
    let coordenadas;
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position) {
        coordenadas = { lat: position.coords.latitude, lon: position.coords.longitude };
      });
    }
    return coordenadas;
  }

  const iniciarApp = async () => {
    const datosGuardados = await verificarLocalidadGuardada();
    if (datosGuardados) {
      const { lat, lon } = datosGuardados;
      actualizarDataApp(lat, lon, dispatch);
      return;
    }

    const geolocalizacion = solicitarLocalizacion();
    if (geolocalizacion) {
      const { lat, lon } = geolocalizacion;
      actualizarDataApp(lat, lon, dispatch)
      localStorage.setItem('miLocalidad', JSON.stringify(geolocalizacion));
    } else {
      const coordenadasPorDefecto = { lat: 19.4326, lon: -99.1332 };
      actualizarDataApp(coordenadasPorDefecto.lat, coordenadasPorDefecto.lon, dispatch);
      localStorage.setItem('miLocalidad', JSON.stringify(coordenadasPorDefecto))
    }
  }

  useEffect(() => {
    iniciarApp();
  }, []);

  return (
    <div className='App'>
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