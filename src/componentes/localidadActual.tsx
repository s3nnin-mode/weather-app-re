import { useEffect, useRef, useState } from "react";
import '../stylesheet/localidadactual.scss';
import { actualizarDataApp } from "../utils/estados";
import { useAppDispatch } from "../hooks";
import { ciudadesGuardadasProps } from "../interfacez&types/ciudadGuardada";

interface Props {
  localidad: ciudadesGuardadasProps;
  ocuparEspacio: () => void;
  hayUnaInterfazAbierta: boolean;
}

export const LocalidadActual: React.FC<Props> = ({localidad, hayUnaInterfazAbierta, ocuparEspacio}) => {
  const dispatch = useAppDispatch();
  const { name, state, country, lat, lon } = localidad;
  // const [milLocalidad, setMiLocalidad] = useState()
  // const { name } = milLocalidad

  // useEffect(() => {
  //   if (localidad) {
  //     setMiLocalidad(milLocalidad)
  //   } else {
  //     const localidadGuardada = localStorage.getItem('miLocalidad');
  //     if (localidadGuardada) {
  //       setMiLocalidad(JSON.parse(localidadGuardada))
  //     }
  //   }
  // })

  return (
    <div className='info-localidad-actual-contenedor'>
      <div>
        <h3 className='titulo-localidad'>Localidad actual</h3>
        <i className='bi bi-geo-alt' onClick={() => actualizarDataApp(lat, lon, dispatch)}/>
      </div>
      <p className='localidad-actual-text font-google-delgada'>
        { name || ''} {state || ''} {country || ''}
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
      className="btn btn-dark" 
      type="button" 
      data-bs-toggle={hayUnaInterfazAbierta ? '' : 'collapse'}
      data-bs-target="#buscador-config" 
      aria-expanded="false" 
      aria-controls="collapseExample" 
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