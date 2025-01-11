import '../../stylesheet/weatherApp.scss';
import { useAppSelector } from '../../hooks';
import { contaminacionData, weatherData } from '../../states/weather';
import { Molinos } from './molinos';
import { useState } from 'react';

interface Props {
  data: string;
  iconClass: string; 
}

const convertirMsAKm = (viento: number) => {
  return Math.floor(viento * 3.6);
}

const useViento = () => {
  const weather = useAppSelector(weatherData);
  const velocidadDelViento: number = weather.wind.speed;
  const direccionDelViento = weather.wind.deg;
  return { velocidadDelViento, direccionDelViento }
}

const useContaminacion = () => {
  const contaminacionInfo = useAppSelector(contaminacionData);
  if (!contaminacionInfo) {
    const test = { co: 0, nh3: 0, no: 0, no2: 0, o3: 0, pm2_5: 0, pm10: 0, so2: 0 }
    return test;
  }
  
  const { list } = contaminacionInfo;
  const { components } = list[0];
  return components;
}

export const DetallesConIconos = () => {
  const { velocidadDelViento, direccionDelViento } = useViento();
  const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = useContaminacion();

  const weather = useAppSelector(weatherData);
  const { humidity, pressure }= weather.main;
  const visibilidad = weather.visibility >= 1000 ? Math.floor(weather.visibility / 1000) : weather.visibility;
  const calidadDelAireCo = (concentracion: number) => {
    if (concentracion <= 4000) {
      return 'Good'
    } else if (concentracion <= 9400) {
      return 'Fair'
    } else if (concentracion <= 12400 ) {
      return 'Moderate'
    } else if (concentracion < 15400) {
      return 'Poor'
    } else if (concentracion >= 15400) {
      return 'Very poor'
    }
  }

  const calidadDelAireSO2 = (concentracion: number) => {
    if (concentracion < 20) {
        return 'Good';
    } else if (concentracion < 80) {
        return 'Fair';
    } else if (concentracion < 250) {
        return 'Moderate';
    } else if (concentracion < 350) {
        return 'Poor';
    } else {
        return 'Very poor';
    }
  };

  const calidadDelAirePM25 = (concentracion: number) => {
    if (concentracion < 40) {
        return 'Good';
    } else if (concentracion < 70) {
        return 'Fair';
    } else if (concentracion < 150) {
        return 'Moderate';
    } else if (concentracion < 200) {
        return 'Poor';
    } else {
        return 'Very poor';
    }
  };

  const calidadDelAireO3 = (concentracion: number) => {
    if (concentracion < 20) {
        return 'Good';
    } else if (concentracion < 50) {
        return 'Fair';
    } else if (concentracion < 100) {
        return 'Moderate';
    } else if (concentracion < 200) {
        return 'Poor';
    } else {
        return 'Very poor';
    }
  };

  const calidadDelAireNO2 = (concentracion: number) => {
  if (concentracion < 40) {
      return 'Good';
  } else if (concentracion < 70) {
      return 'Fair';
  } else if (concentracion < 150) {
      return 'Moderate';
  } else if (concentracion < 200) {
      return 'Poor';
  } else {
      return 'Very poor';
  }
  };

  const calidadDelAirePM10 = (concentracion: number) => {
    if (concentracion < 20) {
        return 'Good';
    } else if (concentracion < 50) {
        return 'Fair';
    } else if (concentracion < 100) {
        return 'Moderate';
    } else if (concentracion < 200) {
        return 'Poor';
    } else {
        return 'Very poor';
    }
  };

  const [collapse, setCollapse] = useState(false);

  return (
    <div className='segundo-encabezado font-google'>

      <div className='contaminacion-contenedor'>
        <h5>About pollution</h5>
        <p className='descripcion-text-contaminacion'>
          You can see data on polluting gases, such as (CO), (NO), (NO 2), (O 3), (SO 2), (NH 3) and particles (PM 2.5 and PM 10).
        </p>

        <button className="btn btn-primary btn-ver-contaminacion" type='button'
        onClick={() => setCollapse(!collapse)} data-bs-toggle="collapse" data-bs-target="#contaminacion" aria-expanded={false} aria-controls="contaminacion">
          See scale for Air Quality Index levels
          <i className="bi bi-arrow-down"></i>
        </button>
        <div className='collapse' id="contaminacion">
          
          <div className='contaminacion-info'>
            <p className='font-google-delgada'>
              Carbon Monoxide 
              <span className={calidadDelAireCo(co)}>
                <span>{co}</span>
                ({calidadDelAireCo(co)})
              </span>
            </p>
            <p className='font-google-delgada'>
              Sulphur dioxide 
              <span className={calidadDelAireSO2(so2)}>
                <span>{so2}</span>
                ({calidadDelAireSO2(so2)})
              </span>
            </p>
            <p className='font-google-delgada'>
              Particulates(PM2.5) 
              <span className={calidadDelAirePM25(pm2_5)}>
                <span>{pm2_5}</span>
                ({calidadDelAirePM25(pm2_5)})
              </span></p>
            <p className='font-google-delgada'>
              Ozone
              <span className={calidadDelAireO3(o3)}>
                <span>{o3}</span>
                ({calidadDelAireO3(o3)})
              </span>
            </p>
            <p className='font-google-delgada'>
              Nitrogen dioxide
              <span className={calidadDelAireNO2(no2)}>
                <span>{no2}</span>
                ({calidadDelAireNO2(no2)})
              </span>
            </p>
            <p className='font-google-delgada'>
              Particulates(PM10)
              <span className={calidadDelAirePM10(pm10)}>
                <span>{pm10}</span>
                ({calidadDelAirePM10(pm10)})
              </span>
            </p>
          </div>
          
        </div>
      </div>

      <div className='viento-contenedor'>
        <Molinos />
        <div className='viento-info'>
          <p>Wind speed {convertirMsAKm(velocidadDelViento)}k/m</p>
          <p>Wind deg {direccionDelViento}°</p>
        </div>
      </div>

      <div className='detalles-con-iconos'>
        <div className='detalle'>
          <i className="bi bi-moisture" />
          <p className='descripcion'>Humedad</p>
          <p className='dato'>{humidity}%</p>
        </div>
        <div className='detalle'>
          <i className="bi bi-eye" />
          <p className='descripcion'>Visibilidad</p>
          <p className='dato'>{visibilidad}k</p>
        </div>
        <div className='detalle'>
          <i className="bi bi-thermometer" />
          <p className='descripcion'>Presion</p>
          <p className='dato'>{pressure}mb</p>
        </div>
      </div>

    </div>
  )
}