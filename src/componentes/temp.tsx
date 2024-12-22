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

  const claseParaUnidadActual = (unidadCorrespondiente: string) => {
    if (unidad === unidadCorrespondiente) {
      return 'texto-con-css'
    }
    return 'texto-sin-css'
  }

  return (
    <div className='current-temp-container'>
      <p className='temp font-google-delgada'>{temp ? conversor(unidad, temp) : 'cargando'}°</p>
      <div className='font-google'>
        <p 
        className={claseParaUnidadActual('celcius')}
        onClick={() => dispatch(setUnidad('celcius'))}>
          C
        </p>
        <p 
        className={claseParaUnidadActual('farenheit')} 
        onClick={() => dispatch(setUnidad('farenheit'))}>
          F
        </p>
      </div>
    </div>
  )
}