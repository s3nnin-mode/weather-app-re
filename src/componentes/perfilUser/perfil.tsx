import '../../stylesheet/perfil.scss';
import { Auth } from 'firebase/auth';
import { getUserInfo, updateCoordUser } from '../../services/firebaseConfig';
import React, { useContext, useEffect, useState } from 'react';
import { ciudadesGuardadasProps } from '../../interfacez&types/ciudadGuardada';
import { MiLocalidadContexto } from '../../contextos/localidadGuardadaContexto';
import { useLocalidadGuardada } from '../localidadActual';

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
    <div className='contenedor-perfil'>
      <div className='foto-y-name'>
        <img 
        src={
          misDatos.photoUrl !== '' ? misDatos.photoUrl : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="foto de perfil sin foto" />
        <p className='name-user font-google-delgada'>{misDatos.name || 'cargando...'}</p>
      </div>
        <button 
          className="btn btn-dark" 
          type="button" 
          data-bs-toggle='collapse'
          data-bs-target="#perfil-config" 
          aria-expanded="false" 
          aria-controls="perfil-config" 
          onClick={ocuparEspacio}
        >
          <i className="bi bi-arrow-right" />
        </button>
    </div>
  )
}