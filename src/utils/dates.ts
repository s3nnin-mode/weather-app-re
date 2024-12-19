import { UTCTimestamp } from "lightweight-charts";

export const obtenerHoraActual = (dtUTC: UTCTimestamp) => {
    const date = new Date(dtUTC * 1000)
    const horas = date.getHours();
    const min = date.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const horaReset = horas % 12 || 12; 
    const currentTime = `${horaReset}:${min} ${ampm}`;
    return currentTime;
}

export const obtenerFechaActual = (dtUTC: number) => {
    const date = new Date(dtUTC * 1000);
    const dia = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]; 
    const mesActual = meses[date.getMonth()].substring(0, 3);
    const fechaDeHoy = `${year}/${month}/${dia}`;
    return { fechaDeHoy, mesActual, dia};
}