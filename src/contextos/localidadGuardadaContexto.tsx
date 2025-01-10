import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ciudadesGuardadasProps } from "../interfacez&types/ciudadGuardada";
import { actualizarDataApp } from "../utils/estados";
import { useAppDispatch } from "../hooks";
import { getMapa } from "../services/mapa";
import { getContaminacion } from "../services/contaminacion";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserInfo, updateCoordUser, updateHistory, updateLocalidadUser } from "../services/firebaseConfig";
import { json } from "stream/consumers";

interface coordenadas {
  lat: number;
  lon: number;
}

interface datosDeUsuarioLogeado {
  name: string, email: string, coord: { lat: number, lon: number }, photoUrl: string ,history: ciudadesGuardadasProps[]
}

interface Propsd {
  miLocalidad: coordenadas;
  // setMiLocalidad: React.Dispatch<React.SetStateAction<coordenadas>>;
  misDatos: datosDeUsuarioLogeado;
  setMisDatos: React.Dispatch<React.SetStateAction<datosDeUsuarioLogeado>>
  usuarioAutenticado: boolean;
  setUsuarioAutenticado: React.Dispatch<React.SetStateAction<boolean>>;
  actualizarLocalidad: (props: coordenadas) => void;
}

export const esperarEstadoDeUsuario = () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      resolve(user); // Devuelve el usuario autenticado o `null` si no hay ninguno
    });
  });
};


const useDatos = () => {
  const [miLocalidad, setMiLocalidad]= useState<coordenadas>({ lat: 16.868, lon: -99.894});
  const [misDatos, setMisDatos] = useState<datosDeUsuarioLogeado>({name: '', email: '', photoUrl: '',coord: { lat: 1, lon: 1 }, history: []});
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);

  const actualizarLocalidad = async (coord: coordenadas) => {
    setMiLocalidad(coord);
    localStorage.setItem('miLocalidad', JSON.stringify(coord));
    const usuarioLogeado = await esperarEstadoDeUsuario();
    if (usuarioLogeado) {
      updateLocalidadUser(coord);
    }
  }

  return { misDatos, setMisDatos, usuarioAutenticado, setUsuarioAutenticado, miLocalidad, actualizarLocalidad };
}

export const MiLocalidadContexto = createContext<Propsd | null>(null);

export const LocalidadGuardada: React.FC<PropsWithChildren<{}>> = ({children}) => {

  const { misDatos, usuarioAutenticado, setUsuarioAutenticado, miLocalidad, actualizarLocalidad, setMisDatos } = useDatos();
  const dispatch = useAppDispatch();

  const verificarLocalidadGuardada =  async () => {
    const localidadGuardada = localStorage.getItem('miLocalidad');
    if (localidadGuardada) {
      
      return JSON.parse(localidadGuardada);
    }
  }
    
  const solicitarLocalizacion = async (): Promise<coordenadas | null> => {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(position => {
          const coordenadas: coordenadas = { lat: position.coords.latitude, lon: position.coords.longitude }
          resolve(coordenadas)
        }, (error) => {
          console.log(error)
          reject(null);
        })
      })
    } else {
      return null
    }
  }
  
  const iniciarApp = async () => {
    const usuarioLogeado = await esperarEstadoDeUsuario();
    if (usuarioLogeado) {
      const data = await getUserInfo();
      if (data) {
        setUsuarioAutenticado(true);
        setMisDatos(Object(data));
        actualizarLocalidad(data.coord);
        actualizarDataApp(data.coord.lat, data.coord.lon, dispatch);
        console.log('hay usuario logeado', data);
        return;
      }
    }

    const datosGuardados = await verificarLocalidadGuardada();
    if (datosGuardados) {
      const { lat, lon } = datosGuardados;
      actualizarDataApp(lat, lon, dispatch);
      actualizarLocalidad(datosGuardados);
      return;
    }

    try {
      const geolocalizacion = await solicitarLocalizacion();
      if (geolocalizacion) {
        actualizarDataApp(geolocalizacion.lat, geolocalizacion.lon, dispatch);
        actualizarLocalidad(geolocalizacion);
      } else {
        throw new Error('no se obtuvo geolocalizacion')
      }
    } catch(error) {
      actualizarDataApp(miLocalidad.lat, miLocalidad.lon, dispatch);
      localStorage.setItem('miLocalidad', JSON.stringify(miLocalidad));
    }
  }
    
  useEffect(() => {
    iniciarApp();
    console.log('cambio de usuario');
  }, [usuarioAutenticado]);

  return (
    <MiLocalidadContexto.Provider 
    value={{ miLocalidad, misDatos, setMisDatos, usuarioAutenticado, setUsuarioAutenticado, actualizarLocalidad }}
    >
      {children}
    </MiLocalidadContexto.Provider>
  )
}