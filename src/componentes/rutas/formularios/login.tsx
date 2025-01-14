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
      <div className="modal fade mostrar-modal-exitoso" tabIndex={-1} ref={modalExitosoRef} aria-hidden={true}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <h2>Bienvendo a mi aplicacion del clima!</h2>
              <p>
                Hola, antes que nada, te agradezco que le hayas dado la oportunidad a esta app del clima aunque sea para probarla o darme feedback :). Esta app la he desarrrollado con el fin de mejorar mis habilidades de programacion y aprender nuevas tecnologias como typescript, a su vez me ayudó a famirializarme más con react y su entorno en cuanto a hooks.
              </p>
              <p>
                Es cierto que es mi primer app desarrollada pero me he encargado de hacerla lo mas 'útil' posible, ya que tienes a disponibilidad lo que cualquier aplicacion del clima tendría, he aqui un resumen:
              </p>
              <ul>
                <li>
                  Tendrás un historial de las ciudades que has visitado.
                </li>
                <li>
                  Si permites obtener la geolocalización la aplicacion se configurará automaticamente para mostrar el clima de tu localidad.
                </li>
                <li>
                  Puedes configurar y cambiar tu localidad predeterminada, esto es util por si te mudas de ciudad o para no tener que buscar repetitivamente tu localidad cada vez que entras.
                </li>
                <li>
                  Puedes ver el pronostico para los proximos cinco dias y una grafica que detallará la temperatura en el transcurso del dia junto a su respectiva hora pronosticada.
                </li>
                <li>
                  Puedes usar la app sin necesidad de registrarte. Tanto tu historial como tu localidad se aguardaran en tu localstorage o cuenta, dependiendo como uses la app.
                </li>
                <li>
                  Una vez registrado, puedes colocarte un nombre y foto de perfil!
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