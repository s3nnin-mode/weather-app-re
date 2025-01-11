import { useAppSelector } from "../../hooks";
import '../../stylesheet/seccionPronostico/pronostico.scss';
import { datosDeLaGrafica, pronosticoParaCincoDias } from "../../states/pronostico";
import { CartaInfo } from "./pronosticoComponentes/carta"
import { CustomChart } from "./pronosticoComponentes/grafica";
import { diaLegible } from "../../utils/diaLegibleUtils";
import { CartaConDetalles } from "./pronosticoComponentes/cartaConDetallesPronostico";

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
   `${diaLegible(dataGrafica[0].dt_txt.substring(0, 10), '-')} '${dataGrafica[0].dt_txt.substring(0, 10)}'` :  //dataGrafica[0].dt_txt.substring(0, 10) Es un trozo de cadena que devuelve una fecha en formato año-mes-dia.
    'cargando...';

  return (
    <div className='cartas-y-grafica'>
      <div className="contenedor-cartas">
        <h4 className='descripcion'>Pronostico para cinco dias:</h4>
        <div className='cartas'>
          {cartas}
        </div>
      </div>

      <h5>Pronostico para el dia <span>{textFechaGrafica}</span></h5>

      <CartaConDetalles />

      <div className='contenedor-grafica'>
        <p className="text-fecha-grafica font-google-delgada descripcion">
          <span>(la grafica arroja el pronostico cada 3 horas)</span>
        </p>
        <div className='grafica'>
          <CustomChart />
        </div>
      </div>
    </div>
  )
}