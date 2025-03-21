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
import { useAppSelector } from "../../hooks"
import { weatherData } from "../../states/weather"
import { LluviaAnimacion } from "../reusables/lluviaAnimacion"
import WeatherEffect from "../reusables/animacionClima"

export const WeatherMain = () => {
  const weather = useAppSelector(weatherData);
  console.log(weather);
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
          {/* {
            weather.weather[0].description.includes('rain') && (
              <div className='animacion-lluvia'>
                <WeatherEffect weatherType="storm" />
              </div>
            )
          } */}
          {/* <div className='paisaje-fondo'>
            <img src="https://png.pngtree.com/thumb_back/fw800/background/20220529/pngtree-landscape-panorama-horizontal-daylight-climate-photo-image_1035581.jpg" alt="paisaje" />
            <WeatherEffect weatherType="storm" />
          </div> */}
          <Pronostico />
          {/* <div className='paisaje-fondo'>
            <img src="https://png.pngtree.com/thumb_back/fw800/background/20220529/pngtree-landscape-panorama-horizontal-daylight-climate-photo-image_1035581.jpg" alt="paisaje" />
          </div> */}

          {/* {
            weather.weather[0].description.includes('rain') && (
              <div className='animacion-lluvia'>
                <WeatherEffect weatherType="storm" />
              </div>
            )
          } */}
          
          {/* <VientoYSol /> */}
        </section>
        <Alerta />
      </div>
    </>
  )
}