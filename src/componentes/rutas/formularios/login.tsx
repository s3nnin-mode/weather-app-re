import { useForm } from "react-hook-form";
import '../../../stylesheet/rutas/formularios.scss'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/firebaseConfig";
import { useRef, useState } from "react";
import { Modal } from "bootstrap";
import { useHistorialContext } from "../../sidebar/sidebarComponentes/historial";

export const FormularioLogin = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const navigate = useNavigate();
  const modalExitosoRef = useRef(null);
  const { cargarHistorial } = useHistorialContext();

  const onSubmit = handleSubmit(async (data) => {
    try {
      
      const loginExitoso = await loginUser(data.correo, data.contraseña);
      if (loginExitoso === 'Login exitoso') {
        setLoginErrorMsg('');
        reset();
        cargarHistorial();

        if (modalExitosoRef.current) {
          const modalBootstrap = new Modal(modalExitosoRef.current);
          modalBootstrap.show();
        }
      } else {
        setLoginErrorMsg(loginExitoso);
      }
    } catch(error) {
    }
  });

  return (
    <div className="seccion-formulario">

      <div className="contenedor-formulario-login">
        <Link to='/'>
          <i className="bi bi-x-lg icono-regresar-a-home" />
        </Link>

        <h3>Hola!</h3>
        <p>Ingresa con tu cuenta</p>
        
        <form onSubmit={onSubmit}>
          <div>
            <input type="email" placeholder="ejemplo@gmal.com" { ...register('correo', {
              required: {
                value: true,
                message: 'Correo es requerido.'
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Correo no valido.'
              }
            })}/>

            {errors.correo && ( <span>{String(errors.correo?.message)}</span>)}
          </div>

          <div>
            <input type="password" placeholder="contraseña" {...register('contraseña', {
              required: {
                value: true,
                message: 'Contraseña requerida'
              }
            })} />

            {errors.contraseña && <span>{String(errors.contraseña.message)}</span>}
          </div>

          <span>{loginErrorMsg}</span>

          <button className="btn btn-warning">Iniciar sesión</button>

        </form>
        <p className='btn-ir-a-registro'>
          ¿No tienes una cuenta?
          <Link to='/formulario/register'>
            <span>Crear cuenta</span>
          </Link>
        </p>
      </div>

      {/*MODAL PARA PRESENTAR LA APP SI SE INICIÓ SESIÓN EXITOSAMENTE*/}
      <div className="modal fade" tabIndex={-1} ref={modalExitosoRef} aria-hidden={true}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Bienvendo a mi aplicacion del clima!.</h2>
              <p>
                Esta app la he desarrrollado con el fin de mejorar mis habilidades de programacion y aprender nuevas tecnologias que está de más decirlo si no eres desarrollador o simplemente no te interesa, 
              </p>
              <p>
                Es cierto que es mi primer app desarrollada pero no la subestimes, tienes a disponibilidad lo que cualquier aplicacion del clima tendria, he aqui un resumen:
              </p>
              <ul>
                <li>
                  Tendrás un historial de las ciudades que has visitado.
                </li>
                <li>
                  Si permites obtener la geolocalización la aplicacion se configurará automaticamente para mostrar el clima de tu localidad.
                </li>
                <li>
                  Puedes configurar y cambiar tu localidad predeterminada si te mudas a otra ciudad.
                </li>
                <li>
                  Si probaste la app sin registrarte habrás notado que funciona sin tener una cuenta logeada.
                  Asi que si, puedes usarla sin tener que crear una cuenta si es que no quieres.
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => navigate('/')}>Entendido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}