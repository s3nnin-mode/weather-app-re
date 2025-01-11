import { useRef, useState } from "react";
import { Collapse } from "bootstrap";
import { useForm } from "react-hook-form";
import '../../../stylesheet/sidebar/submenus/configPerfil.scss';
import { useDatosUser } from "../sidebarComponentes/perfil";
import { subirFotoUser, updateFotoPerfil, updateNombreUser } from "../../../services/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useHistorialContext } from "../sidebarComponentes/historial";

interface PropsPerfilConfig {
    liberarEspacio: () => void;
    setUsuarioLogeado: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfigPerfil: React.FC<PropsPerfilConfig> = ({liberarEspacio, setUsuarioLogeado}) => {
  const collapseRef = useRef(null);
  const { cargarHistorial } = useHistorialContext();
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const formCambiarFoto = useForm();
  const { misDatos, setMisDatos, setUsuarioAutenticado } = useDatosUser();

  const [estadoNombreActualizado, setEstadoNombreActualizado] = useState<{ exitoso: boolean, mensaje: string} | null>(null);
  const [estadoFotoActualizado, setEstadoFotoActualizado] = useState<{exitoso: boolean, mensaje: string} | null>(null);

  const handleCollapse = () => {
    if (collapseRef.current) {
      const bsCollapse = Collapse.getInstance(collapseRef.current) || new Collapse(collapseRef.current);
      bsCollapse.hide(); 
      liberarEspacio();
      setEstadoNombreActualizado(null);
    }
  };

  const cambiarNombre = handleSubmit( async (data) => {
    const nombreActualizado = await updateNombreUser(data.cambiarNombre);
    if (nombreActualizado) {
      const nuevosDatos = {...misDatos,  name: data.cambiarNombre };
      reset();
      setMisDatos(nuevosDatos);
      setEstadoNombreActualizado({exitoso: true, mensaje: 'Nombre actualizado correctamente'});
      setTimeout(() => {
        setEstadoNombreActualizado(null);
      }, 5000);
      return
    }
    setEstadoNombreActualizado({exitoso: false, mensaje: 'Algo pasó, espera unos segundos y vuelve a intentar porfavor'});
  });

  const cambiarFoto = formCambiarFoto.handleSubmit(async (data) => {
    const archivo = data.cambiarFoto[0];
    if (archivo) {
      const url = await subirFotoUser(archivo);
      console.log('si se subió')
      if (url) {
        updateFotoPerfil(url);
        setMisDatos({...misDatos, photoUrl: url});
        setEstadoFotoActualizado({exitoso: true, mensaje: 'Foto actualizada correctamente'});
        formCambiarFoto.reset();

        setTimeout(() => {
          setEstadoFotoActualizado(null);
        }, 5000);
        console.log('fot cambiada correctamente');
        return;
      }
      setEstadoFotoActualizado({exitoso: false, mensaje: 'Hubó un error, vuelve a intentar despues de unos segundos porfavor.'});
    }
  });

  const CerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUsuarioAutenticado(false);
    setUsuarioLogeado(false);
    cargarHistorial();
    handleCollapse();
  }

  return (
    <div className="collapse contenedor-perfil-config" id="perfil-config" ref={collapseRef}>
      <button className='btn btn-dark' onClick={handleCollapse}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <form className='form-cambiar-nombre' onSubmit={cambiarNombre}>
        <div>
          <label htmlFor="cambiarNombre" className='font-google-delgada'>Cambiar mi nombre</label>
            <input type="text" className='font-google-delgada' {...register('cambiarNombre', {
              required: {
                value: true,
                message: 'Se requiere un nombre.'
              },
              maxLength: {
                value: 12,
                message: 'Solo nombres con menos de 12 caracteres.'
              }
            })}/>
            {
            errors.cambiarNombre && <span className='error-cambiar-nombre font-google-delgada'>{String(errors.cambiarNombre.message)}</span>
            }
            {
              estadoNombreActualizado !== null && 
              
              <span style={{color: estadoNombreActualizado.exitoso ? '#92c93f' : 'red'}} className='cambiar-nombre-mensaje font-google-delgada'>
                {estadoNombreActualizado.mensaje} <i className={`bi bi-${estadoNombreActualizado.exitoso ? 'check' : 'x'}-circle-fill`}></i>
              </span>
            }
        </div>
          
        <button className="btn btn-dark">Listo</button>
      </form>

      <form onSubmit={cambiarFoto}>
        <div>
          <label htmlFor="cambiarFoto" className='font-google-delgada'>Cambiar foto de perfil</label>
          <input className='input-file' type="file" {...formCambiarFoto.register('cambiarFoto', {
            required: {
              value: true,
              message: 'Se requiere una foto.'
            }
          })}/>
          {
          formCambiarFoto.formState.errors.cambiarFoto && 
          <span className='error-cambiar-foto font-google-delgada'>{String(formCambiarFoto.formState.errors.cambiarFoto?.message)}</span>
          }
          {
          estadoFotoActualizado !== null && 
          <span className='cambiar-foto-mensaje font-google-delgada' style={{ color: estadoFotoActualizado.exitoso ? '#92c93f' : 'red'}}>
            {estadoFotoActualizado.mensaje} <i className={`bi bi-${estadoFotoActualizado.exitoso ? 'check' : 'x'}-circle-fill`}></i>
          </span>
          }
        </div>
        <button className="btn btn-dark font-google-delgada">Listo</button>
      </form>

      <button className='btn btn-dark btn-cerrar-sesion font-google' onClick={CerrarSesion}>Cerrar sesión</button>
    </div>
  )
}