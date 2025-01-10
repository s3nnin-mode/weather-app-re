import { useEffect, useState } from 'react';
import '../stylesheet/sidebar.scss';
import { CiudadesVisitadas } from './misciudades';
import { LocalidadActual } from './localidadActual';
import { CartaInfoUnidadActual } from './cartaUnidadActual';
import { InterfazCambiarLocalidad } from './submenus/configLocalidad';
import { InterfazCambiarUnidad } from './submenus/configUnidad';
import { esperarEstadoDeUsuario, LocalidadGuardada } from '../contextos/localidadGuardadaContexto';
import { BtnRegistro } from './btnLogin';
import { PerfilUsuario, useDatosUser } from './perfilUser/perfil';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserInfo } from '../services/firebaseConfig';
import { ConfigPerfil } from './submenus/configPerfil';

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