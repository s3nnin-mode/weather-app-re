import { useAppSelector } from "../hooks";
import '../stylesheet/pronostico.scss';
import { datosDeLaGrafica, pronosticoParaCincoDias } from "../states/pronostico";
import { CartaInfo } from "./carta"
import { CustomChart } from "./grafica";
import { diaLegible } from "../utils/diaLegibleUtils";

export const Pronostico = () => {
  const pronosticos = useAppSelector(pronosticoParaCincoDias);
  const fechasPronosticadas = Object.keys(pronosticos); 
  const dataGrafica = useAppSelector(datosDeLaGrafica);

  if (fechasPronosticadas.length > 5) {
    fechasPronosticadas.pop();
  }
  
  const cartas = fechasPronosticadas.map(fecha => {
    const INDICE_PARA_EXTRAER_DATOS_POR_DEFECTO = 0;
    const dia = diaLegible(fecha, '-')
    const { temp_max, temp_min } = pronosticos[fecha][INDICE_PARA_EXTRAER_DATOS_POR_DEFECTO].main;
    const iconImg = pronosticos[fecha][INDICE_PARA_EXTRAER_DATOS_POR_DEFECTO].weather[0].icon;
    const style = fecha === fechasPronosticadas[0];                      //Para dar estilo de carta-select a la primer carta del pronostico al cargar la pagina
    return <CartaInfo estilo={ style ? 'carta-select' : '' } dia={dia} srcImg={iconImg} tempMax={temp_max} tempMin={temp_min} key={fecha} fecha={fecha} />
  });

  const textFechaGrafica = dataGrafica.length > 0 ?
   `Pronostico para el dia ${diaLegible(dataGrafica[0].dt_txt.substring(0, 10), '-')} '${dataGrafica[0].dt_txt.substring(0, 10)}'` :  //dataGrafica[0].dt_txt.substring(0, 10) Es un trozo de cadena que devuelve una fecha en formato año-mes-dia.
    'cargando...';

  return (
    <div className='cartas-y-grafica'>
      <div className="contenedor-cartas">
        <h2 className='descripcion'>Pronostico:</h2>
        <div className='cartas'>
          {cartas}
        </div>
      </div>
      <div className='contenedor-grafica'>
        <p className="text-fecha-grafica font-google-delgada descripcion">
          <span style={{display: 'block'}}>{textFechaGrafica}</span>
          <span>(pronostico cada 3 horas)</span>
        </p>
        <div className='grafica'>
          <CustomChart />
        </div>
      </div>
    </div>
  )
}