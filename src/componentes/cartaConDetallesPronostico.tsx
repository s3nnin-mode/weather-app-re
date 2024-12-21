import { useAppSelector } from "../hooks";
import { datosDeLaGrafica } from "../states/pronostico";
import { unidadActual } from "../states/unidadParaGrados";
import '../stylesheet/cartaConDetallesPronostico.scss';
import { conversor } from "../utils";
import { convertirMsAKm } from "./vientoysol";

interface Main {
  feels_like: number
grnd_level?: number
humidity?: number
pressure?: number
sea_level?:number
temp: number
temp_kf?: number
temp_max: number
temp_min: number
}

export const CartaConDetalles = () => {
  const unidad = useAppSelector(unidadActual)
  const datos = useAppSelector(datosDeLaGrafica)[0];
  if (!datos) {
    return <div>Cargando datos...</div>
  }

  const { weather, main, wind, clouds, visibility} = datos;
  const mainD: Main = main
  const { pressure, grnd_level, humidity } = mainD;
  
  const { speed, deg } = wind;

  const visibilidad = visibility >= 1000 ? Math.floor(visibility / 1000) : visibility;

  const { description, icon } = weather[0];
  const parametroMeteorologico = weather[0].main;
  console.log('datos', datos)
  return (
    <div className='contenedor-detalles-pronostico'>
      <div className='detalles'>
        <div className='detalles-header'>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
          <p>{parametroMeteorologico}, {description}, nubosidad {clouds.all}%</p>
        </div>
        <div className='detalles-body'>
          <div className='presion-texto'>
            <i className="bi bi-thermometer" />
            <p>PSNM {pressure}mb</p>
          </div>
          <div className='presion-suelo'>
            <p>PSN{grnd_level}hPa</p>
          </div>
          <div className='velocidad-viento'>
            <i className="bi bi-wind icono-viento" />
            <p>viento {convertirMsAKm(speed)}k/h</p>
          </div>
          <div className='direccion-viento'>
            <i className="bi bi-wind icono-viento" />
            <i className="bi bi-compass"></i>
            <p>{deg}°</p>
          </div>
          <div className='visibilidad'>
            <i className='bi bi-eye' />
            <p>{visibilidad}k</p>
          </div>
          <div className='humedad-texto'>
            <i className="bi bi-moisture" />
            <p>Humidity {humidity || 'cargando..'}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

{/* <p className='temp-pronostico-texto'>
          Temperatura min esperada: {conversor(unidad, temp_min)}°,
          Temperatura max esperada: {conversor(unidad, temp_max)}°
        </p> */}