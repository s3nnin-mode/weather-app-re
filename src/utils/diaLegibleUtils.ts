export const diaLegible = (fecha: string, separador: string) => {
  const arr = fecha.split(separador);
  const year = parseFloat(arr[0]);
  const month = parseFloat(arr[1]) - 1;
  const day = parseFloat(arr[2]);
  const data = new Date(year, month, day);
  const diasDeLaSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  return diasDeLaSemana[data.getDay()];
}