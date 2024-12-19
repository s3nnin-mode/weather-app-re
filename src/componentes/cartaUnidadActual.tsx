import { useState } from "react";
import { useAppSelector } from "../hooks";
import { unidadActual } from "../states/unidadParaGrados";
import '../stylesheet/cartainfounidadactual.scss';

interface Props {
  ocuparEspacio: () => void;
  hayUnaInterfazAbierta: boolean
}

export const CartaInfoUnidadActual: React.FC<Props> = ({ocuparEspacio, hayUnaInterfazAbierta}) => {
  const unidad = useAppSelector(unidadActual);

  return (
    <div className='info-unidad-contenedor'>
      <p className='font-google'>
        Unidad Actual: 
        <span className='unidad-text font-google-delgada'> {unidad}</span>
      </p>
      <button 
        className="btn btn-dark btn-unidad-actual" 
        type="button" 
        data-bs-toggle={ hayUnaInterfazAbierta ? '' : 'collapse'}
        data-bs-target="#config-unidad" 
        aria-expanded="false" 
        aria-controls="collapseExample" 
        onClick={ocuparEspacio}
        >
          <i className="bi bi-arrow-right" />
      </button>
    </div>
  )
}