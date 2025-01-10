import { useAppDispatch } from "../hooks"
import { PropsLocalidadLi } from "../interfacez&types/localidadLi";
import { useHistorialContext } from "./misciudades";
import { actualizarDataApp } from "../utils/estados";
import { useContext, useEffect } from "react";
import { MiLocalidadContexto } from "../contextos/localidadGuardadaContexto";

export const LocalidadLi: React.FC<PropsLocalidadLi> = ({city, state, country, lat, lon, esConfig, esHistorial}) => {
  const dispatch = useAppDispatch();
  const { agregarLocalidadAHistorial, borrarLocalidadDeHistorial } = useHistorialContext();
  const contextoUsuario = useContext(MiLocalidadContexto);

  const handleClick = async () => {
    actualizarDataApp(lat, lon, dispatch)
    if (esConfig) {                                                     //si el componente Buscador es el del sidebar(esta siendo usado para actualizar la localidad), la ciudad seleccionada se guardara en el localstorage para tener acceso la proxima vez de forma predeterminada
      if (!contextoUsuario) {
        console.error('El contexto solo puede usarse dentro del Sidebar');
        return;
      }
      contextoUsuario.actualizarLocalidad({lat, lon});
    }
    if (!esHistorial && !esConfig) {                                     //Este componente LocalidadLi es usado en 3 casos: para el historial de navegacion, para cambiar(configurar) tu nueva localidad y para mostrar los resultados al buscar una ciudad especifica en el buscador arriba a la derecha
      agregarLocalidadAHistorial({city: city || '', state: state || '', country: country || '', lat: lat, lon: lon});
    }
  }

  const borrarLocalidad = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    borrarLocalidadDeHistorial({lat, lon});
  }
  
  return (
    <li className={`list-group-item font-google-delgada`} onClick={handleClick}>
      <div>
        <i className="bi bi-geo-alt-fill" />
        <span>{city || ''} {state || ''} {country || ''}</span>
      </div>
      <i                                                           
      className='bi bi-trash icon-borrar' 
      style={{display: esHistorial ? 'block' : 'none'}} //El icono de 'borrar' solo estara disponible para el historial
      onClick={(e) => borrarLocalidad(e)} />                       
    </li>
  )
}