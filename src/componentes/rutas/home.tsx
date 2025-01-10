import { Alerta } from "../alert"
import { BtnAbrirSidebar } from "../btnAbrirSidebar"
import { Buscador } from "../buscador"
import { DetallesConIconos } from "../detallesconiconos"
import { LocalidadYDetalles } from "../localidadyDetalles"
import { Pronostico } from "../pronosticoCartas"
import { Sidebar } from "../sidebar"
import { Temperatura } from "../temp"
import { VientoYSol } from "../vientoysol";

import '../../stylesheet/weatherApp.scss';
import { Route, Routes } from "react-router-dom"

export const WeatherMain = () => {
  return (
    <>
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
      
    </>
  )
}