import axios from "axios"

export const getMapa = async () => {
    const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHERMAP;
    try {
        const mapResponse = await axios.get(`https://tile.openweathermap.org/map/pressure_new/3/0/0.png?appid=${APIKEY}`);
        if (!mapResponse) {
            throw new Error(`Mapa error`)
        }
        return mapResponse;
    } catch(error) {
        console.log(error)
    }
}