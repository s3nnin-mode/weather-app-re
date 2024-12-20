import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../hooks';
import { unidadActual } from '../states/unidadParaGrados';
import '../stylesheet/sidebar.scss';
import { CiudadesVisitadas } from './misciudades';
import { LocalidadActual } from './localidadActual';
import { CartaInfoUnidadActual } from './cartaUnidadActual';
import { Buscador } from './buscador';
import { ciudadesGuardadasProps } from '../interfacez&types/ciudadGuardada';
import { setUbicacion } from '../states/weather';
import { getUbicacion } from '../services/ubicacion';
import { InterfazCambiarLocalidad } from './submenus/configLocalidad';
import { InterfazCambiarUnidad } from './submenus/configUnidad';

// const [interfaz, setInterfaz] = useState({
//   interfaces: ['unidad actual', 'configurar localidad', 'historial'],
//   interfazActual: 'ninguno'
// });

const useLocalidadActual = () => {
  const [localidad, setLocalidad] = useState<ciudadesGuardadasProps>({name: '', lat: 0, lon: 0});

  const actualizarMiLocalidad = ({name, state, country, lat, lon}: ciudadesGuardadasProps) => {
    const nuevaLocalidad = {name, state, country, lat, lon};
    setLocalidad(nuevaLocalidad);
  }

  const metodos = {
    paraActualizarLocalidad: {
      esConfig: true,
      retornarUbicacion: actualizarMiLocalidad,
    }
  }

  return { localidad, setLocalidad, metodos }
}

const useInterfaces = () => {
  const [hayUnaInterfazAbierta, setHayUnaInterfazAbierta] = useState(false);

  const ocuparEspacio = () => {
    setHayUnaInterfazAbierta(true);
  }

  const liberarEspacio = () => {
    setHayUnaInterfazAbierta(false);
  }
  return { ocuparEspacio, liberarEspacio, hayUnaInterfazAbierta };
}

export const Sidebar = () => {
  const { metodos } = useLocalidadActual();
  const { ocuparEspacio, liberarEspacio, hayUnaInterfazAbierta } = useInterfaces();

  return (
    <div className='offcanvas offcanvas-start' data-bs-backdrop="false" data-bs-scroll="false" tab-index="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
          WeatherApp --S3nnin
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close">
        </button>
      </div>
      <div className='offcanvas-body'>
        <div className='btns' style={{display: hayUnaInterfazAbierta ? 'none' : 'block'}}>
          <button type="button" className='btn-login btn btn-secondary' disabled>
            Iniciar Sesión <span className='texto-desabilitado'>(en beta..)</span>
          </button>

          <CartaInfoUnidadActual ocuparEspacio={ocuparEspacio} hayUnaInterfazAbierta={hayUnaInterfazAbierta}/>
          <LocalidadActual ocuparEspacio={ocuparEspacio} hayUnaInterfazAbierta={hayUnaInterfazAbierta} />
          <CiudadesVisitadas />
        </div>
          <InterfazCambiarUnidad liberarEspacio={liberarEspacio}/>
          <InterfazCambiarLocalidad paraConfig={metodos} liberarEspacio={liberarEspacio} />
      </div>
    </div>
  )
}