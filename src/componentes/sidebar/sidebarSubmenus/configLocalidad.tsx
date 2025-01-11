import { Buscador } from "../../reusables/buscador";
import '../../../stylesheet/sidebar/submenus/interfazCambiarLocalidad.scss';
import { useRef } from "react";
import { Collapse } from "bootstrap";

interface Props {
  liberarEspacio: () => void;
}

export const InterfazCambiarLocalidad: React.FC<Props> = ({liberarEspacio}) => {
  const collapseRef = useRef(null);

    const handleCollapse = () => {
      if (collapseRef.current) {
        const bsCollapse = Collapse.getInstance(collapseRef.current) || new Collapse(collapseRef.current);
        bsCollapse.hide(); 
        liberarEspacio(); 
      }
    };

    return (
      <div className="collapse buscador-cambiar-localidad" id="buscador-config" ref={collapseRef}>
        <button 
          className="btn btn-dark" 
          type="button" 
         
          onClick={handleCollapse} 
          >
          <i className="bi bi-arrow-left"></i>
        </button>
        <Buscador esConfig={true}/>
        <div className='nota-buscador-config'>
        <p>
          <span>NOTA: </span> 
          En esta sección puedes cambiar tu localidad. 
          La localidad se guarda en el localstorage, asi no es necesario buscar tu ciudad
          manualmente cada vez que entres! 
        </p>
        </div>
      </div>
    )
}