import '../../../stylesheet/seccionPronostico/carta.scss';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { pronosticoParaCincoDias } from '../../../states/pronostico';
import { setDatosParaGrafica } from '../../../states/pronostico';
import { PropsCarta } from '../../../interfacez&types/carta';
import { unidadActual } from '../../../states/unidadParaGrados';
import { conversor } from '../../../utils';
import { cartaSelecAnimacion } from '../../../utils';

export const CartaInfo: React.FC<PropsCarta> = ({ dia, srcImg, tempMax, tempMin, fecha, estilo }) => {
  const dispatch = useAppDispatch()
  const pronosticos = useAppSelector(pronosticoParaCincoDias);
  const unidad = useAppSelector(unidadActual);

  const handleClick = () => {
    dispatch(setDatosParaGrafica(pronosticos[fecha]))
    cartaSelecAnimacion(fecha);   
  }

	return (
    <div id={fecha} className={`carta font-google-delgada ${estilo}`} onClick={() => handleClick()}>
      <p className='nombre-del-dia font-google-delgada'>{dia}</p>
      <img src={`http://openweathermap.org/img/wn/${srcImg}@2x.png`} alt='icono representativo del clima actual' />
      <p className='grados'>
        <span className='grados-max-text'>Max {conversor(unidad, tempMax)}°</span>
        <br />
        <span className='grados-min-text'>Min {conversor(unidad, tempMin)}°</span>
      </p>
    </div>
	);
}