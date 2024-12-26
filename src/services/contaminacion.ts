import axios from "axios"

export const getContaminacion = async (lat: number, lon: number) => {
    const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHERMAP;
    try {
        const contaminacion = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
        if (!contaminacion) {
            throw new Error(`Mapa error`);
        }
        console.log(contaminacion)
        return contaminacion.data;
    } catch(error) {
        console.log(error)
    }
}