import { useAppSelector } from "../../hooks";
import '../../stylesheet/seccionPronostico/pronostico.scss';
import { datosDeLaGrafica, pronosticoParaCincoDias } from "../../states/pronostico";
import { CartaInfo } from "./pronosticoComponentes/carta"
import { CustomChart } from "./pronosticoComponentes/grafica";
import { diaLegible } from "../../utils/diaLegibleUtils";
import { CartaConDetalles } from "./pronosticoComponentes/cartaConDetallesPronostico";
import WeatherEffect from "../reusables/animacionClima";
import { useEffect, useState } from "react";

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

type WeatherConditions = "Clear" | "Clouds" | "Rain" | "Snow" | "Thunderstorm" | "Drizzle" | "Mist" | "Fog";

export const Pronostico = () => {
  const pronosticos = useAppSelector(pronosticoParaCincoDias);
  const fechasPronosticadas = Object.keys(pronosticos); 
  const dataGrafica = useAppSelector(datosDeLaGrafica);

  const [background, setBackground] = useState("default.jpg");

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

  const datos = useAppSelector(datosDeLaGrafica)[0];

  // const { weather, main, wind, clouds, visibility} = datos;
  // const mainD: Main = main;
  
  // const { description, icon } = weather[0];
  // const parametroMeteorologico = weather[0].main;
  const [description, setDescription] = useState('');
  const [parametroMeteorologico, setParametroMeteorologico] = useState('');

  useEffect(() => {
    if (datos) {
      const { weather, main, wind, clouds, visibility} = datos;
      setDescription(weather[0].description);
      setParametroMeteorologico(weather[0].main.toLocaleLowerCase());
    }
  }, [datos]);

  const conditions = {
    clear: 'https://valdostadailytimes.com/wp-content/uploads/sites/3/2024/10/sun.jpg?w=1024',
    clouds: 'https://grangers.co.uk/cdn/shop/articles/engin-akyurt-gJILnne_HFg-unsplash.jpg?v=1711643298',
    rain: 'https://media.rnztools.nz/rnz/image/upload/s--RLYz7o-5--/ar_16:10,c_fill,f_auto,g_auto,q_auto,w_1050/v1683070845/4MQVIYW_rain_weather_umbrella_jpg?_a=BACCd2AD',
    snow: 'https://turnto10.com/resources/media/7d4844df-2db8-49fb-921a-e6ae86ee64be-jumbo3x1_BarbaraHumphriesDirectUploader7Jan202421_52UTC.jpeg',
    thunderstorm: 'https://media.istockphoto.com/id/1413876271/photo/lightning-strike-in-a-thunderstorm.jpg?s=612x612&w=0&k=20&c=TZhuf1H_qbJbiY14YwGvnMEMjF8cw0CQ1TJjGQ-tBGE=',
    drizzle: 'https://assets1.cbsnewsstatic.com/hub/i/r/2024/10/29/0f07773d-924e-4bbc-8b26-bbc4336acf4d/thumbnail/640x360/5962d97f9d4cb2b93ad88e60a643538f/gettyimages-923186070.jpg?v=564e83c5974b3893ba1bcac5fe5947af',
    mist: 'https://news24online.com/wp-content/uploads/2024/11/PRI-41.jpg',
  };

  useEffect(() => {
    if (parametroMeteorologico.includes('clear')) {
      setBackground(conditions['clear'])
    } else if (parametroMeteorologico.includes('clouds')) {
      setBackground(conditions['clouds'])
      console.log('parametrooooo',conditions['clouds'])
    } else if (parametroMeteorologico.includes('rain')) {
      setBackground(conditions['rain'])
    } else if (parametroMeteorologico.includes('snow')) {
      setBackground(conditions['snow'])
    } else if (parametroMeteorologico.includes('thunderstorm')) {
      setBackground(conditions['thunderstorm'])
    } else if (parametroMeteorologico.includes('drizzle')) {
      setBackground(conditions['drizzle'])
    } else if (parametroMeteorologico.includes('mist') || parametroMeteorologico.includes('fog')) {
      setBackground(conditions['mist'])
    } else {
      setBackground("default.jpg");
    }
  }, [parametroMeteorologico]);

  // if (!datos) {
  //   return <div>Cargando datos...</div>
  // }

  return (
    <div className='cartas-y-grafica'>
      <div className='cartas-y-calidad-aire'>
        <div className="contenedor-cartas">
          <h4 className='descripcion'>Pronostico para cinco dias:</h4>
          <div className='cartas'>
            {cartas}
          </div>
        </div>
        
        <h5>Pronostico para el dia <span>{textFechaGrafica}</span></h5>
        <CartaConDetalles />
      </div>

      <div className='contenedor-grafica'>
        <div className='paisaje-fondo'>
          <img 
          src={background}
          alt="paisaje" 
          />
          {
            description.includes('rain') && (
              <WeatherEffect weatherType='rain' />
            )
          }
          {
            description.includes('snow') && (
              <WeatherEffect weatherType='snow' />
            )
          }
          {
            description.includes('autumn') && (
              <WeatherEffect weatherType='autumn' />
            )
          }
          {
            description.includes('storm') && (
              <WeatherEffect weatherType='storm' />
            )
          }
        </div>
        <div>
          <p className="text-fecha-grafica font-google-delgada descripcion">
            <span>(la grafica arroja el pronostico cada 3 horas)</span>
          </p>
          <div className='grafica'>
            <CustomChart />
          </div>
        </div>
      </div>
    </div>
  )
}