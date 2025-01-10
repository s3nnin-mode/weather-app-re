import { useForm } from 'react-hook-form';
import '../../stylesheet/rutas/register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/firebaseConfig';
import { useRef, useState } from 'react';
import { Modal } from 'bootstrap';

const useFormRegister = () => {
  const { register, formState: {errors}, handleSubmit, watch, reset } = useForm();
  const [registerStateMsg, setRegisterStateMsg] = useState('');
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = handleSubmit( async (data) => {
    try {
      setRegisterStateMsg('Verificando datos del registro...')
      if (modalRef.current) {
        const modalBootstrap = new Modal(modalRef.current, {focus: true, keyboard: true, backdrop: true});
        modalBootstrap.show();
      }
      const registroExitoso = await registerUser(data.nombre, data.correo, data.contraseña);
      if(registroExitoso === 'Registro exitoso') {
        setRegisterStateMsg('Registrado Correctamente!. Presione Redirigir para poder iniciar sesión con su nueva cuenta.');
        setUsuarioRegistrado(true);
      } else {
        setRegisterStateMsg(registroExitoso);
        setUsuarioRegistrado(false);
      }
    } catch(error) {
      console.log('error al obtener respuesta del registro', error);
    }
  });

  const contraseña = watch('contraseña');

  return { register, errors, onSubmit, contraseña, reset, navigate, registerStateMsg, setRegisterStateMsg, usuarioRegistrado, modalRef };
}

export const FormRegister = () => {
  const { register, errors, onSubmit, contraseña, reset, navigate, registerStateMsg, setRegisterStateMsg, usuarioRegistrado,modalRef } = useFormRegister();
  
  return (
    <section className='seccion-form-register'>
      <div className='contenedor-form-register'>

        <div className='titulo-form-register'>
          <i className="bi bi-cloud-fill" />
          <Link to='/'>
            <i className="bi bi-x-lg icono-regresar-a-home" />
          </Link>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='nombre'>Nombre</label>
            <input type='text' placeholder='Ingresa tu nombre aqui porfavor.'
            {...register('nombre', {
              required: {
                value: true,
                message: 'Nombre requerido.'
              }
            })}/>
            {errors.nombre && <span>{String(errors.nombre.message)}</span>}
          </div>
          <div>
            <label htmlFor='correo'>Correo</label>
              <input type='email' placeholder='Ingresa tu correo aqui porfavor.'
              {...register('correo', {
                required: {
                  value: true,
                  message: 'Correo requerido.'
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Ingresa un correo valido porfavor.'
                }
              })}/>
              {errors.correo && <span>{String(errors.correo.message)}</span>}
          </div>
          <div>
            <label htmlFor='contraseña'>Contraseña</label>
            <input placeholder='Ingresa tu contraseña aqui porfavor' 
              {...register('contraseña', {
                required: {
                  value: true,
                  message: 'Contraseña requerida.'
                },
                minLength: {
                  value: 7,
                  message: 'La contraseña debe tener al menos 7 caracteres.'
                },
                maxLength: {
                  value: 18,
                  message: 'La contraseña no debe tener más de 18 caracteres'
                }
            })}/>
            {errors.contraseña && <span>{String(errors.contraseña.message)}</span>}
          </div>
          <div>
            <label htmlFor='confirmarContraseña'>Confirmar contraseña</label>
            <input placeholder='Confirma tu contraseña aqui.'
            {...register('confirmarContraseña', {
              required: {
                value: true,
                message: 'Debes confirmar la contraseña.'
              },
              validate: (value) => value === contraseña || 'las contraseñas deben coincidir'
            })} />
            {errors.confirmarContraseña && <span>{String(errors.confirmarContraseña.message)}</span>}
          </div>

          <button className='btn btn-dark'>
            Registrarse
          </button>

        </form>
        <p>
          ¿Ya tienes una cuenta? 
          <Link to='/formulario/login'>
            Iniciar sesión.
          </Link>
        </p>
      </div>

      <div className="modal fade modal-register" tabIndex={-1} ref={modalRef} aria-hidden={true}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <p>{registerStateMsg}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setRegisterStateMsg('')}>Close</button>
              {usuarioRegistrado && (
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => navigate('/formulario/login')}>
                  Redirigir
                </button>
              )}  
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}