import '../../../stylesheet/sidebar/sidebarComponentes/localidadactual.scss';
import { actualizarDataApp } from "../../../utils/estados";
import { useAppDispatch } from "../../../hooks";
import { useContext, useEffect, useState } from 'react';
import { MiLocalidadContexto } from '../../../contextos/datosUsuarioContexto';
import { getUbicacion } from '../../../services/ubicacion';
import { ciudadesGuardadasProps } from '../../../interfacez&types/ciudadGuardada';

interface Props {
  ocuparEspacio: () => void;
}

export const useLocalidadGuardada = () => {
  const contexto = useContext(MiLocalidadContexto);

  if (!contexto) {
    throw new Error('NO PUEDES USAR CONTEXTO DE COORDENADAS FUERA DEL SIDEBAR');
  }
  return contexto;
}

const useMiLocalidad = () => {
  const { miLocalidad } = useLocalidadGuardada();
  const [miUbicacion, setMiUbicacion] = useState<ciudadesGuardadasProps | null>(null);

  useEffect(() => {
    const obtenerLocalidad = async () => {
      try {
        const { lat, lon } = miLocalidad;
        console.log('localidad', miLocalidad)
        const localidadActual = await getUbicacion(lat, lon);
        if (localidadActual) {
          setMiUbicacion(localidadActual);
        }
      } catch(error) {
        throw new Error('NO SE OBTUVO COORDENADAS, NI LAS DE POR DEFECTO');
      }
    }
    obtenerLocalidad();
  }, [miLocalidad])
  return miUbicacion;
}

export const LocalidadActual: React.FC<Props> = ({ocuparEspacio}) => {

  const dispatch = useAppDispatch();
  const miLocalidad = useMiLocalidad();

  if(!miLocalidad) {
    return <div>cargando...</div>
  }

  const { city, state, country, lat, lon } = miLocalidad;

  return (
    <div className='info-localidad-actual-contenedor'>
      <div>
        <h3 className='titulo-localidad'>Localidad actual</h3>
        <i className='bi bi-geo-alt' onClick={() => actualizarDataApp(lat, lon, dispatch)}/>
      </div>
      <p className='localidad-actual-text font-google-delgada'>
        { city || ''} {state || ''} {country || ''}
      </p>
      <p className='coord-lat font-google-delgada'>
        <span>latitud:</span>
        <span>{lat}</span>
      </p>
      <p className='coord-lon font-google-delgada'>
        longitud:
        <span>{lon}</span>
      </p>
      <button 
      className="btn font-google-delgada" 
      type="button" 
      data-bs-toggle='collapse'
      data-bs-target="#buscador-config" 
      aria-expanded="false" 
      aria-controls="buscador-config" 
      onClick={ocuparEspacio}
      >
        Cambiar mi localidad.
      </button>
    </div>
  )
}

{/* <div className='contenedor-cambiar-localidad'>
        <button onClick={() => setConfigAbierto(true)} className="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          Button with data-bs-target
        </button>
        <div className="collapse buscador-cambiar-localidad" id="collapseExample">
          <Buscador paraActualizarLocalidad={metodos} />
        </div>
      </div> */}

{/* <button className='btn btn-dark btn-cambiar-localidad font-google' onClick={() => setConfigAbierto(true)}>
        Cambiar mi localidad
      </button>
      { configAbierto && (
        <Buscador paraActualizarLocalidad={metodos} />
      )} */}