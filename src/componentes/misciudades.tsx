import { useContext, useEffect } from "react";
import { LocalidadLi } from "./localidadLi";
import '../stylesheet/misciudades.scss';
import { HistorialContext } from "../contextos/historialContexto";

export const useHistorialContext = () => {
  const contexto = useContext(HistorialContext);

  if (!contexto) {
    throw new Error('HistorialContext debe usarse solo dentro de su proveedor');
  }
  return contexto;
}

export const CiudadesVisitadas = () => {
  const { historial, setHistorial } = useHistorialContext();

  useEffect(() => {
    const ciudadesGuardadas = localStorage.getItem('ciudadesVisitadas');
    ciudadesGuardadas ? 
    setHistorial(JSON.parse(ciudadesGuardadas)) : 
    localStorage.setItem('ciudadesVisitadas', JSON.stringify([]));
  }, []);

  const ciudades = historial.length > 0 ? historial.map(ciudad => {
    return <LocalidadLi 
    name={ciudad.name} 
    state={ciudad.state} 
    country={ciudad.country} 
    lat={ciudad.lat} 
    lon={ciudad.lon} 
    esHistorial={true} />
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