import { useEffect, useState } from 'react';
import '../../stylesheet/sidebar/sidebar.scss';
import { CiudadesVisitadas } from './sidebarComponentes/historial';
import { LocalidadActual } from './sidebarComponentes/localidadActual';
import { CartaInfoUnidadActual } from './sidebarComponentes/cartaUnidadActual';
import { InterfazCambiarLocalidad } from './sidebarSubmenus/configLocalidad';
import { InterfazCambiarUnidad } from './sidebarSubmenus/configUnidad';
import { esperarEstadoDeUsuario, LocalidadGuardada } from '../../contextos/datosUsuarioContexto';
import { BtnRegistro } from './sidebarComponentes/btnLogin';
import { PerfilUsuario } from './sidebarComponentes/perfil';
import { ConfigPerfil } from './sidebarSubmenus/configPerfil';

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
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  
  useEffect(() => {
    const usuarioLogeado = async () => {
      const usuario = await esperarEstadoDeUsuario();
      if (usuario) {
        setUsuarioLogeado(true)
      }
    }
    usuarioLogeado();
  }, []);

  return (
    <LocalidadGuardada>
      <div className='offcanvas offcanvas-start' data-bs-backdrop="false" data-bs-scroll="true" tab-index="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
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
            {usuarioLogeado ? <PerfilUsuario ocuparEspacio={ocuparEspacio} /> : <BtnRegistro />}
            <CartaInfoUnidadActual ocuparEspacio={ocuparEspacio} />
            <LocalidadActual ocuparEspacio={ocuparEspacio} />
            <CiudadesVisitadas />
          </div>

            <InterfazCambiarUnidad hayUnaInterfazAbierta={hayUnaInterfazAbierta} liberarEspacio={liberarEspacio}/>
            <InterfazCambiarLocalidad liberarEspacio={liberarEspacio} />
            <ConfigPerfil setUsuarioLogeado={setUsuarioLogeado} liberarEspacio={liberarEspacio} />
        </div>
      </div>
    </LocalidadGuardada>
  )
}