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