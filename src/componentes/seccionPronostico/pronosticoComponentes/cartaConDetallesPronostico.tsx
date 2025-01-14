import { useAppSelector } from "../../../hooks";
import { datosDeLaGrafica } from "../../../states/pronostico";
import { unidadActual } from "../../../states/unidadParaGrados";
import { conversor } from "../../../utils";
import { convertirMsAKm } from "../../vientoysol";
import '../../../stylesheet/seccionPronostico/cartaConDetallesPronostico.scss';

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
            <p style={{color: 'grey'}}>PSNM <span style={{color: 'white'}}>{pressure}mb</span></p>
          </div>
          <div className='presion-suelo'>
            <p>PSN <span>{grnd_level}hPa</span></p>
          </div>
          <div className='velocidad-viento'>
            <i className="bi bi-wind icono-viento" />
            <p>viento <span>{convertirMsAKm(speed)}k/h</span></p>
          </div>
          <div className='direccion-viento'>
            <i className="bi bi-wind icono-viento" />
            <i className="bi bi-compass"></i>
            <p><span>{deg}°</span></p>
          </div>
          <div className='visibilidad'>
            <i className='bi bi-eye' />
            <p>{visibilidad}k</p>
          </div>
          <div className='humedad-texto'>
            <i className="bi bi-moisture" />
            <p>Humedad {humidity || 'cargando..'}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}