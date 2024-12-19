import axios from "axios";
import { PronosticoProps } from "../interfacez&types/weather";
import { setPronostico } from "../states/pronostico";
import { setDatosParaGrafica } from "../states/pronostico";

const agruparDias = (list: PronosticoProps[]) => {
  const date = new Date();
  const dia = date.getDate();
  const mes = date.getMonth() + 1;
  const año = date.getFullYear();
  const hoy = `${año}-${mes}-${dia < 10 ? `0${dia}` : dia}`;

  let dias: { [key: string]: PronosticoProps[] } = {};

  for (let i = 0; i < list.length; i++) {
    const fechaActual = list[i].dt_txt.substring(0, 10);
    if (hoy === fechaActual) continue; //EN EL PRONOSTICO DE 5 DIAS NO QUIERO INCLUIR EL DIA ACTUAL YA QUE POR LO GENERAL LA API DEVUELVE POCAS HORAS POR NO DECIR CASI NINGUNA A DIFERENCIA DEL PRONOSTICO DE LOS PROXIMOS 5 DIAS
    dias[fechaActual] === undefined ? 
    dias[fechaActual] = [list[i]] : 
    dias[fechaActual].push(list[i]);
  }
  return dias;
}

export const getPronostico = async (lat: number, lon: number, dispatch: any) => {
	const APIKEY = process.env.REACT_APP_API_KEY_OPENWEATHERMAP;
	try {
		const pronostico = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const fechas = agruparDias(pronostico.data.list);
    const datosPorDefectoParaLagrafica = Object.values(fechas)[0];
    dispatch(setPronostico(fechas));
    dispatch(setDatosParaGrafica(datosPorDefectoParaLagrafica));
  } catch(err) {
		console.log(err)
	}
}