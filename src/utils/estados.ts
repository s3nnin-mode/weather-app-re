import { getClimaActual } from "../services/climaActual";
import { getUbicacion } from "../services/ubicacion";
import { setUbicacion, setWeather, setContaminacion } from "../states/weather";
import { getPronostico } from "../services/pronostico";
import { getContaminacion } from "../services/contaminacion";


export const actualizarDataApp = async (lat: number, lon: number, dispatch: any) => {
    const dataClima = await getClimaActual(lat, lon);
    const dataUbicacion = await getUbicacion(lat, lon);
    const contaminacionData = await getContaminacion(lat, lon);

    if (dataClima && dataUbicacion && contaminacionData)  {
        dispatch(setWeather(dataClima));
        dispatch(setUbicacion(dataUbicacion));
        dispatch(setContaminacion(contaminacionData))
        getPronostico(lat, lon, dispatch);
    }
}