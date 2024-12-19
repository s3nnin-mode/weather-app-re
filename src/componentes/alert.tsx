import { useAppSelector } from "../hooks";
import { unidadActual } from "../states/unidadParaGrados";
import '../stylesheet/alerta.scss'

export const Alerta = () => {
  const unidad = useAppSelector(unidadActual);

  return (
    <div id='liveToast' className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay='5000' data-bs-autohide='true'>
      <div className="d-flex">
        <div className="toast-body">
        {`Los datos se mostraran con la unidad de medida ${unidad}`}
        </div>
        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  )
}