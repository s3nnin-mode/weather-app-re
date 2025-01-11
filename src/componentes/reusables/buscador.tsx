import '../../stylesheet/buscador.scss';
import { LocalidadLi } from './localidadLi';
import { getSugerencias } from '../../services/sugerencias';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PropsLocalidadLi } from '../../interfacez&types/localidadLi';

export interface PropsBuscador {
  esConfig?: boolean;
}

export const Buscador: React.FC<PropsBuscador> = ({ esConfig }) => {
  const [sugerencias, setSugerencias] = useState<PropsLocalidadLi[]>([]);
  const [error, setError] = useState(false);
  const [iconResponsiveClicked, setIconResponseClicked] = useState(false);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setError(false);
      setSugerencias([]);
      return;
    }
    const sugerenciasData = await getSugerencias(e.target.value) || [];
    setSugerencias(sugerenciasData);
    setError(sugerenciasData.length === 0);
  }

  const componentes = sugerencias.map(obj => {
    const { city, state, country, lat, lon } = obj;
    return <LocalidadLi 
    city={city} state={state} country={country} lat={lat} lon={lon} key={lat + lon + city} 
    esConfig={esConfig} />
  });

  useEffect(() => {
    const esconderSugerencias = (e: MouseEvent) => {
      const elementoClickeado = e.target as HTMLElement;
      if (elementoClickeado.id !== 'referencia') {
        setSugerencias([]);
      }
    }
    window.addEventListener('click', esconderSugerencias);
    return () => window.removeEventListener('click', esconderSugerencias);
  }, []);

  const haySugerencias = sugerencias.length > 0;
  // style={{color: haySugerencias ? 'gray' : 'orange', opacity: haySugerencias ? 1 : .9}}

  return (
    <div id='referencia'>
      <div className={
        `input-search-container${esConfig ? '-config' : ''} 
        ${haySugerencias && !esConfig ? '' : 'contenedor-buscador-inactivo'}
        ${iconResponsiveClicked ? 'mostrar-buscador-responsive' : `${!esConfig ? 'ocultar-buscador-responsive' : ''}`}`
      }>
        <h2 className='font-google'>Busca y selecciona tu nueva localidad: </h2>
        <div className='input-contenedor'>
          <i className='bi bi-search lupa' />
          <input className='font-google-delgada input-buscador-inactivo' onChange={(e) => handleChange(e)} placeholder='buscar ciudad...' aria-label='Buscar ciudad'/>
        </div>
        <ul className='list-group list-group-flush'>
        { componentes }
        { error && (
          <div className='msg-undefined'>
            <span><i className="bi bi-info" /></span>
            <span>
              No se encontraron resultados.
              <br />
              Por favor, verifica que no haya errores ortográficos o que el nombre de la ciudad esté completa.
            </span>
          </div>
        )}
        </ul>
      </div>
      { !esConfig && (
        iconResponsiveClicked ? 
        <i className="bi bi-x-lg icon-cerrar-responsive" onClick={() => setIconResponseClicked(!iconResponsiveClicked)}></i> :
        <i className="bi bi-globe-americas icon-mundo-responsive" onClick={() => setIconResponseClicked(!iconResponsiveClicked)}></i>
      )}
    </div>
  );
}