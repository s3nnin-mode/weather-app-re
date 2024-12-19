import { useAppSelector } from "../hooks";
import { unidadActual } from "../states/unidadParaGrados";
import { ubicacionData, weatherData } from "../states/weather";
import { diaLegible, conversor, obtenerHoraActual, obtenerFechaActual } from "../utils";
import '../stylesheet/localidadydetalles.scss';
import { UTCTimestamp } from "lightweight-charts";

export const LocalidadYDetalles = () => {
  const unidad = useAppSelector(unidadActual);

  const ubicacion = useAppSelector(ubicacionData);
  const { name, state, country } = ubicacion;

  const weather = useAppSelector(weatherData);
  const descripcionDelCielo = weather.weather[0].description;
  const nubosidad = weather.clouds.all;
  const { feels_like, temp_min, temp_max } = weather.main;
  const { lat, lon } = weather.coord;

  const currentTime = obtenerHoraActual(weather.dt as UTCTimestamp);
  const { fechaDeHoy, dia, mesActual} = obtenerFechaActual(weather.dt)

	return (
		<div className='localidad-mas-detalles'>
      <p className='localidad'>{`${name || ''} ${state || ''} ${country || ''}`}</p>
      <p className='hora'>{currentTime}</p> 
      <p className='fecha'>
        {diaLegible(fechaDeHoy, '/')} {dia}, {mesActual}
      </p>
      <p className='font-google descripcion coord'>
          Coord: Lat <span className='font-google-delgada dato'>{lat}</span>, Lon <span className='google-font-delgada dato'>{lon}</span>
      </p>
			<p className='descripcion-del-cielo font-google-delgada descripcion'>{descripcionDelCielo}, Nubosidad <span className="dato">{nubosidad}%</span></p>
			<div className='detalles'>
				<p className='font-google-delgada descripcion'>Sensacion termica<span className='font-google dato'>{conversor(unidad, feels_like)}°</span></p>
				<p className='font-google-delgada descripcion'>Temperatura min<span className='font-google dato'>{conversor(unidad, temp_min)}°</span></p>
				<p className='font-google-delgada descripcion'>Temperatura max<span className='font-google dato'>{conversor(unidad, temp_max)}°</span></p>
			</div>
		</div>
	)
}