import axios from "axios"

export const getUbicacion = async (lat: number, lon: number) => {
    const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHERMAP;

    try {
        const data = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKEY}`);
        return data.data[0];
    } catch(error) {
        console.log(error)
    }
}