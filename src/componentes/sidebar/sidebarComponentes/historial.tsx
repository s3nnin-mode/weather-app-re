import { useContext, useEffect } from "react";
import { LocalidadLi } from "../../reusables/localidadLi";
import '../../../stylesheet/sidebar/sidebarComponentes/historial.scss';
import { HistorialContext } from "../../../contextos/historialContexto";

export const useHistorialContext = () => {
  const contexto = useContext(HistorialContext);

  if (!contexto) {
    throw new Error('HistorialContext debe usarse solo dentro de su proveedor');
  }
  return contexto;
}

export const CiudadesVisitadas = () => {
  const { historial, setHistorial } = useHistorialContext();

  const ciudades = historial.length > 0 ? historial.map(ciudad => {
    return <LocalidadLi 
    city={ciudad.city} 
    state={ciudad.state} 
    country={ciudad.country} 
    lat={ciudad.lat} 
    lon={ciudad.lon} 
    esHistorial={true}
    key={ciudad.city + ciudad.state + ciudad.country + ciudad.lat + ciudad.lon}
     />
  }) : <div className='msg-sin-historial font-google-delgada'>No hay ciudades recientes.</div>;
      
  return (
    <div className='contenedor-historial'>
      <h3>Historial</h3>
      <ul className='list-group list-group-flush mis-ciudades'>
        {ciudades}
      </ul>
    </div>
  )
}