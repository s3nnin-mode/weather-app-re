import '../stylesheet/weatherApp.scss';
import { useAppSelector } from '../hooks';
import { weatherData } from '../states/weather';

interface Props {
  data: string;
  iconClass: string; 
}

export const DetallesConIconos = () => {
  const weather = useAppSelector(weatherData);
  const { humidity, pressure }= weather.main;
  const visibilidad = weather.visibility >= 1000 ? Math.floor(weather.visibility / 1000) : weather.visibility;

  return (
    <div className='segundo-encabezado font-google'>
      <div className='detalle'>
        <i className="bi bi-moisture" />
        <div>
          <p className='descripcion'>Humedad</p>
          <p className='dato'>{humidity}%</p>
        </div>
      </div>
      <div className='detalle'>
        <i className="bi bi-eye" />
        <div>
          <p className='descripcion'>Visibilidad</p>
          <p className='dato'>{visibilidad}k</p>
        </div>
      </div>
      <div className='detalle'>
        <i className="bi bi-thermometer" />
        <div>
          <p className='descripcion'>Presion</p>
          <p className='dato'>{pressure}mb</p>
        </div>
      </div>
    </div>
  )
}