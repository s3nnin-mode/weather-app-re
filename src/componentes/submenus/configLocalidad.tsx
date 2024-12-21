import { Buscador } from "../buscador";

interface Props {
  liberarEspacio: () => void;
}

export const InterfazCambiarLocalidad: React.FC<Props> = ({liberarEspacio}) => {
    return (
      <div className="collapse buscador-cambiar-localidad" id="buscador-config">
      <button 
        className="btn btn-dark" 
        type="button" 
        data-bs-toggle='collapse'
        data-bs-target="#buscador-config" 
        aria-expanded="false" 
        aria-controls="collapseExample"
        onClick={liberarEspacio} 
        >
        <i className="bi bi-arrow-left"></i>
      </button>
        <Buscador esConfig={true}/>
      </div>
    )
}