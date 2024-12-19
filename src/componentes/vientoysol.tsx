import { Molinos } from "./molinos";
import { useAppSelector } from "../hooks";
import { weatherData } from "../states/weather";
import '../stylesheet/vientoysol.scss';
import { SunChart } from "./graficadelsol";

export const VientoYSol = () => {
    const weather = useAppSelector(weatherData);
    const { sunrise, sunset} = weather.sys;
    const velocidadDelViento = weather.wind.speed;
    const direccionDelViento = weather.wind.deg;

    const convertirMsAKm = () => {
        return Math.floor(velocidadDelViento * 3.6);
    }

    return (
        <div className='viento-y-sol'>
          <div className='viento-container'>
            <Molinos />
            <div className='detalles-del-viento'>
              <div>
                <p className='descripcion font-google'>Velocidad del viento:</p>
                <p className='font-google-delgada'>{convertirMsAKm()}K/H</p>
              </div>
              <div>
                <p className='descripcion font-google'>Direccion del viento:</p>
                <p className='font-google-delgada'>{direccionDelViento}°</p>
              </div>
            </div>
          </div>
          <div className='sol-container'>
          </div>
        </div>
    )
}