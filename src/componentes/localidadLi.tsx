import { useAppDispatch } from "../hooks"
import { PropsLocalidadLi } from "../interfacez&types/localidadLi";
import { useHistorialContext } from "./misciudades";
import { actualizarDataApp } from "../utils/estados";

export const LocalidadLi: React.FC<PropsLocalidadLi> = ({name, state, country, lat, lon, esConfig, retornarUbicacion, esHistorial}) => {
  const dispatch = useAppDispatch();
  const { setHistorial } = useHistorialContext();

  const guardarCiudadVisitada = () => {
    let miHistorial = localStorage.getItem('ciudadesVisitadas');
    if (miHistorial) {
      const listaHistorial = JSON.parse(miHistorial);
      if (listaHistorial.length >= 8) return;
      const nuevaCiudad = { name: name, state: state, country: country, lat: lat, lon: lon };
      listaHistorial.push(nuevaCiudad);
      localStorage.setItem('ciudadesVisitadas', JSON.stringify(listaHistorial));
      setHistorial(listaHistorial);        //actualizo el historial en el useContext para que este sincronizado con el localstorage
    }
  }

  const handleClick = async () => {
    actualizarDataApp(lat, lon, dispatch)

    if(esConfig && retornarUbicacion) {                           //Para mostrar de forma instantanea la nueva ubicacion del usuario necesito usar una funcion callback para poder ver la localidad seleccionada.
      retornarUbicacion({name, state, country, lat, lon});         //Esto debido a que el contenido del localstorage no se actualiza de inmediato hasta recargar la pagina.
      localStorage.setItem('miLocalidad', JSON.stringify({lat, lon})); 
      return;
    }
    
    if (!esHistorial && !esConfig) {  //Este componente LocalidadLi es usado en 3 casos: para el historial de navegacion, para cambiar(configurar) tu nueva localidad y para mostrar los resultados al buscar una ciudad especifica en el buscador arriba a la derecha
      guardarCiudadVisitada();        //la ciudad a la que se haga click se guardara en el localstorage,
    }                                 //(solo si el elemento li pertenece al buscador 'global' y no al buscador para configurar tu localidad o para mostrar el historial).
  }

  const borrarLocalidad = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const localidadesGuardadas = localStorage.getItem('ciudadesVisitadas');
    if (localidadesGuardadas) {
      const ciudades: PropsLocalidadLi[] = JSON.parse(localidadesGuardadas);
      const ciudadesActualizadas = ciudades.filter(ciudad => ciudad.name !== name);
      localStorage.setItem('ciudadesVisitadas', JSON.stringify(ciudadesActualizadas));
      setHistorial(ciudadesActualizadas)
    }
  }
  
  return (
    <li className={`list-group-item font-google-delgada`} onClick={handleClick}>
      <div>
        <i className="bi bi-geo-alt-fill" />
        <span>{name || ''} {state || ''} {country || ''}</span>
      </div>
      <i                                                           
      className='bi bi-trash icon-borrar' 
      style={{display: esHistorial ? 'block' : 'none'}} //El icono de 'borrar' solo estara disponible para el historial
      onClick={(e) => borrarLocalidad(e)} />                       
    </li>
  )
}