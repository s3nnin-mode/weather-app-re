import axios from "axios";

export const getSugerencias = async (ciudad: string) => {       //Por cada 'keydown' se hace la soli
    const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHERMAP;
    try {
        const sugerencias = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${ciudad}&limit=5&appid=${APIKEY}`);
        return sugerencias.data;
    } catch(err) {
        console.log('error en s u g e r e n c i a s', err)
    }
}