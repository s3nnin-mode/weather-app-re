import { Alerta } from "../alert"
import { BtnAbrirSidebar } from "../seccionClimaActual/btnAbrirSidebar"
import { Buscador } from "../reusables/buscador"
import { DetallesConIconos } from "../seccionClimaActual/detallesconiconos"
import { LocalidadYDetalles } from "../seccionClimaActual/localidadyDetalles"
import { Pronostico } from "../seccionPronostico/pronostico"
import { Sidebar } from "../sidebar/sidebar"
import { Temperatura } from "../seccionClimaActual/temp"

import '../../stylesheet/weatherApp.scss';
import { useAppSelector } from "../../hooks"
import { weatherData } from "../../states/weather"

export const WeatherMain = () => {
  const weather = useAppSelector(weatherData);
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
        </section>
        <Alerta />
      </div>
    </>
  )
}