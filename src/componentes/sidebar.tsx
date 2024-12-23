import { useState } from 'react';
import '../stylesheet/sidebar.scss';
import { CiudadesVisitadas } from './misciudades';
import { LocalidadActual } from './localidadActual';
import { CartaInfoUnidadActual } from './cartaUnidadActual';
import { InterfazCambiarLocalidad } from './submenus/configLocalidad';
import { InterfazCambiarUnidad } from './submenus/configUnidad';
import { LocalidadGuardada } from '../contextos/localidadGuardadaContexto';

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
  const { ocuparEspacio, liberarEspacio, hayUnaInterfazAbierta } = useInterfaces();

  return (
    <LocalidadGuardada>
      <div className='offcanvas offcanvas-start' data-bs-backdrop="false" data-bs-scroll="false" tab-index="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            <i className="bi bi-cloud-fill icono-header-sidebar"></i>
            Clima
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close">
          </button>
        </div>
        <div className='offcanvas-body'>
          <div className={`${hayUnaInterfazAbierta ? 'ocultar-btns' : 'btns'}`}>
            <button type="button" className='btn-login btn btn-secondary' disabled>
              Iniciar Sesión <span className='texto-desabilitado'>(en beta..)</span>
            </button>

            <CartaInfoUnidadActual ocuparEspacio={ocuparEspacio} hayUnaInterfazAbierta={hayUnaInterfazAbierta}/>
            <LocalidadActual ocuparEspacio={ocuparEspacio} hayUnaInterfazAbierta={hayUnaInterfazAbierta} />
            <CiudadesVisitadas />
          </div>
            <InterfazCambiarUnidad liberarEspacio={liberarEspacio}/>
            <InterfazCambiarLocalidad liberarEspacio={liberarEspacio} />
        </div>
      </div>
    </LocalidadGuardada>
  )
}