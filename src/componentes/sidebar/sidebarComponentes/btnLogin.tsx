import { Link } from "react-router-dom"

export const BtnRegistro = () => {
  return (
    <Link to='/formulario/login'>
      <button type="button" className='btn-login btn btn-secondary'>
        Registrarse <span className='texto-desabilitado'>(en beta..)</span>
      </button>
    </Link>
  )
}