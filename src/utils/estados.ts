import { getClimaActual } from "../services/climaActual";
import { getUbicacion } from "../services/ubicacion";
import { setUbicacion, setWeather } from "../states/weather";
import { getPronostico } from "../services/pronostico";


export const actualizarDataApp = async (lat: number, lon: number, dispatch: any) => {
    const dataClima = await getClimaActual(lat, lon);
    const dataUbicacion = await getUbicacion(lat, lon);
    if (dataClima && dataUbicacion) {
        dispatch(setWeather(dataClima));
        dispatch(setUbicacion(dataUbicacion))
        getPronostico(lat, lon, dispatch);
    }
}