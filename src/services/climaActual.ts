import axios from "axios";

export const getClimaActual = async (lat: number, lon: number) => {
  const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHERMAP;
  try {
    const climaActual = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const data = climaActual.data;
    return data;
  } catch(error: any) {
   console.log(error);
  }
}