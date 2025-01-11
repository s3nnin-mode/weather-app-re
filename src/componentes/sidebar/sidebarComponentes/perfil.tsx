import '../../../stylesheet/sidebar/sidebarComponentes/perfil.scss';
import React, { useContext } from 'react';
import { MiLocalidadContexto } from '../../../contextos/datosUsuarioContexto';

interface PropsPerfil {
  ocuparEspacio: () => void;
}

export const useDatosUser = () => {
  const contexto = useContext(MiLocalidadContexto);

  if (!contexto) {
    throw new Error('NO PUEDES USAR LOS DATOS DEL USUARIO DEL CONTEXTO FUERA DEL SIDEBAR');
  }
  return contexto;
}

export const PerfilUsuario: React.FC<PropsPerfil> = ({ocuparEspacio}) => {
  const { misDatos } = useDatosUser();

  return (
    <div 
      className='contenedor-perfil'
      data-bs-toggle='collapse'
      data-bs-target="#perfil-config" 
      aria-expanded="false" 
      aria-controls="perfil-config" onClick={ocuparEspacio}>
        <img 
        src={
          misDatos.photoUrl !== '' ? misDatos.photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="foto de perfil sin foto" />
        <p className='name-user font-google-delgada'>Hi! <span>{misDatos.name || ''}</span></p>
        {/* <i className='bi bi-arrow-right'></i> */}
    </div>
  )
}