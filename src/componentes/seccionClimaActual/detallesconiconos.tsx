import '../../stylesheet/weatherApp.scss';
import { useAppSelector } from '../../hooks';
import { contaminacionData, weatherData } from '../../states/weather';
import { Molinos } from './molinos';
import { useRef, useState } from 'react';
import { Collapse } from 'bootstrap';

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

const useFunciones = () => {
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

  return { calidadDelAireCo, calidadDelAireO3, calidadDelAireNO2, calidadDelAirePM25, calidadDelAirePM10,calidadDelAireSO2 }
}

export const DetallesConIconos = () => {
  const { velocidadDelViento, direccionDelViento } = useViento();
  const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = useContaminacion();
  const { 
    calidadDelAireCo, calidadDelAireO3, calidadDelAireNO2,
    calidadDelAirePM25, calidadDelAireSO2, calidadDelAirePM10 
  } = useFunciones();

  const weather = useAppSelector(weatherData);
  const { humidity, pressure }= weather.main;
  const visibilidad = weather.visibility >= 1000 ? Math.floor(weather.visibility / 1000) : weather.visibility;

  const [collapse, setCollapse] = useState(false);
  const collapseRef = useRef(null);

  const handleCollapse = () => {
    setCollapse(!collapse);
    const isCollapse = !collapse;
    if (collapseRef.current) {
      if (isCollapse) {
        new Collapse(collapseRef.current, { toggle: false } ).show();
      } else {
        new Collapse(collapseRef.current, { toggle: false } ).hide();
      }
    }
  }

  return (
    <div className='segundo-encabezado font-google'>
      {/* <div className='molinos-y-detalles'> */}
      
      {/* <div className='viento-contenedor'>
        <Molinos />
        
        <div className='viento-info'>
            <p className='font-google-delgada'>Wind speed {convertirMsAKm(velocidadDelViento)}k/m</p>
            <p className='font-google-delgada'>Wind deg {direccionDelViento}°</p>
        </div>
      </div> */}

      <div className='detalles-con-iconos'>
        <div className='detalle'>
          <i className="bi bi-moisture" />
          <div>
            {/* <i className="bi bi-moisture" /> */}
            <p className='descripcion font-google-delgada'>Humedad</p>
            <p className='dato font-google-delgada'>{humidity}%</p>
          </div>
        </div>
        <div className='detalle'>
          <i className="bi bi-eye" />
          <div>
          <p className='descripcion font-google-delgada'>Visibilidad</p>
          <p className='dato font-google-delgada'>{visibilidad}k</p>
          </div>
        </div>
        <div className='detalle'>
          <i className="bi bi-thermometer" />
          <div>
          <p className='descripcion font-google-delgada'>Presion</p>
          <p className='dato font-google-delgada'>{pressure}mb</p>
          </div>
        </div>
      </div> 

      <div className='viento-contenedor'>
        <Molinos />
        
        <div className='viento-info'>
            <p className='font-google-delgada'>Wind speed {convertirMsAKm(velocidadDelViento)}k/m</p>
            <p className='font-google-delgada'>Wind deg {direccionDelViento}°</p>
        </div>
      </div>
      {/* </div>  */}



      <div className='contaminacion-contenedor'>
        <h5>About pollution</h5>
        <p className='font-google-delgada'>
          Enterate sobre gases contaminantes, como (CO) y partículas (PM 2,5 y PM 10).
        </p>

        <button className="btn btn-ver-contaminacion" onClick={handleCollapse}>
          Ver escala de niveles del índice de calidad del aire
          <i className={`bi bi-arrow-${collapse ? 'up' : 'down'}`}></i>
        </button>
        <div className='collapse' id="contaminacion" ref={collapseRef}>
          
          <div className='contaminacion-info' ref={collapseRef}>
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

    </div>
  )
}