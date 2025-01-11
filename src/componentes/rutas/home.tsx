import { Alerta } from "../alert"
import { BtnAbrirSidebar } from "../seccionClimaActual/btnAbrirSidebar"
import { Buscador } from "../reusables/buscador"
import { DetallesConIconos } from "../seccionClimaActual/detallesconiconos"
import { LocalidadYDetalles } from "../seccionClimaActual/localidadyDetalles"
import { Pronostico } from "../seccionPronostico/pronostico"
import { Sidebar } from "../sidebar/sidebar"
import { Temperatura } from "../seccionClimaActual/temp"
import { VientoYSol } from "../vientoysol";

import '../../stylesheet/weatherApp.scss';

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