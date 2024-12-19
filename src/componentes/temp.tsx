import { useAppDispatch, useAppSelector } from "../hooks";
import { setUnidad, unidadActual } from "../states/unidadParaGrados";
import { weatherData } from "../states/weather";
import { conversor } from "../utils/conversiongrados";
import '../stylesheet/temp.scss';

export const Temperatura = () => {
  const weather = useAppSelector(weatherData);
  const temp = weather.main.temp;
  const unidad = useAppSelector(unidadActual);

  const dispatch = useAppDispatch();

  return (
    <div className='current-temp-container'>
      <p className='temp font-google-delgada'>{temp ? conversor(unidad, temp) : '..'}°</p>
      <div className='font-google'>
        <p 
        style={{opacity: unidad === 'celcius' ? 1 : 0.3 } }
        onClick={() => dispatch(setUnidad('celcius'))}>
          C
        </p>
        <p 
        style={{opacity: unidad === 'farenheit' ? 1 : 0.3 } } 
        onClick={() => dispatch(setUnidad('farenheit'))}>
          F
        </p>
      </div>
    </div>
  )
}