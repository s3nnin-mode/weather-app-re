import { useRef } from "react";
import { Collapse } from "bootstrap";
import { useForm } from "react-hook-form";
import '../../stylesheet/configPerfil.scss';
import { useDatosUser } from "../perfilUser/perfil";
import { subirFotoUser, updateFotoPerfil, updateNombreUser } from "../../services/firebaseConfig";
import { data, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useHistorialContext } from "../misciudades";

interface PropsPerfilConfig {
    liberarEspacio: () => void;
    setUsuarioLogeado: React.Dispatch<React.SetStateAction<boolean>>;
}



export const ConfigPerfil: React.FC<PropsPerfilConfig> = ({liberarEspacio, setUsuarioLogeado}) => {
  const collapseRef = useRef(null);
  const { cargarHistorial } = useHistorialContext();
  const { register, handleSubmit, formState: {errors} } = useForm();
  const formCambiarFoto = useForm();
  const { misDatos, setMisDatos, setUsuarioAutenticado } = useDatosUser();

  const handleCollapse = () => {
    if (collapseRef.current) {
      const bsCollapse = Collapse.getInstance(collapseRef.current) || new Collapse(collapseRef.current);
      bsCollapse.hide(); 
      liberarEspacio(); 
    }
  };

  const cambiarNombre = handleSubmit((data) => {
    updateNombreUser(data.cambiarNombre);
    const nuevosDatos = {...misDatos,  name: data.cambiarNombre };
    setMisDatos(nuevosDatos);
  });

  const cambiarFoto = formCambiarFoto.handleSubmit(async (data) => {
  
    const archivo = data.cambiarFoto[0];
    if (archivo) {
      const url = await subirFotoUser(archivo);
      console.log('si se subió')
      if (url) {
        updateFotoPerfil(url);
        setMisDatos({...misDatos, photoUrl: url});
        console.log('fot cambiada correctamente')
      }
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
            <input type="text" {...register('cambiarNombre', {
              required: {
                value: true,
                message: 'Nombre es requerido'
              },
              maxLength: {
                value: 17,
                message: 'Solo nombres que tengan menos de 17 caracteres porfavor.'
              }
            })}/>
            {
            errors.cambiarNombre && <span>{String(errors.cambiarNombre.message)}</span>
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
                message: 'url de foto es requerido'
              }
            })}/>
            {formCambiarFoto.formState.errors.cambiarFoto && <span>{String(formCambiarFoto.formState.errors.cambiarFoto?.message)}</span>}
          </div>
        <button className="btn btn-dark">Listo</button>
      </form>

      <button className='btn btn-dark' onClick={CerrarSesion}>Cerrar sesión</button>
    </div>
  )
}