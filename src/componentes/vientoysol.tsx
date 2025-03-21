import { useAppSelector } from "../hooks";
import { weatherData } from "../states/weather";
import '../stylesheet/vientoysol.scss';

export const convertirMsAKm = (viento: number) => {
  return Math.floor(viento * 3.6);
}

export const VientoYSol = () => {

  return (
    <div className='viento-y-sol'>
      <i className="bi bi-cone"></i>
      <h5>Under construccion!</h5>
    </div>
  )
}