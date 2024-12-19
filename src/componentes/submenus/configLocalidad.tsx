import { Buscador, PropsBuscador } from "../buscador";

interface Props {
  paraConfig: PropsBuscador;
  liberarEspacio: () => void;
}

export const InterfazCambiarLocalidad: React.FC<Props> = ({paraConfig, liberarEspacio}) => {
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
        <Buscador paraActualizarLocalidad={paraConfig.paraActualizarLocalidad}/>
      </div>
    )
}