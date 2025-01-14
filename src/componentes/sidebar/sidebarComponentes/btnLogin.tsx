import { Link } from "react-router-dom"
import '../../../stylesheet/sidebar/sidebarComponentes/btnLogin.scss';

export const BtnRegistro = () => {
  return (
    <Link to='/formulario/login'>
      <button className='btn-login btn font-google-delgada'>
        Iniciar sesión
        {/* <span className='texto-desabilitado'>(en beta..)</span> */}
      </button>
    </Link>
  )
}