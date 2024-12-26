export interface UbicacionProps {
  name: string;
  state?: string;
  country?: string;
  lat: number;
  lon: number;
  local_names: any;
}
  
export interface WeatherProps {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: { lon: number, lat: number };
  dt: number;
  id: number;
  main: { feels_like: number, humidity: number, pressure: number, sea_level: number, temp: number, temp_max: number, temp_min: number };
  name: string,
  sys: { type: number, id: number, country: string, sunrise: number, sunset: number },
  timezone: number,
  visibility: number,
  weather: { id: number, main: string, description: string, icon: string }[],
  wind: { speed: number, deg: number }
}

export const InitialStateWeather = {
  ubicacion: {
    name: '',
    state: '',
    country: '',
    lat: 0,
    lon: 0,
    local_names: {}
  },
  climaActual: {
    base: '',
    clouds: { all: 0 },
    cod: 0,
    coord: { lon: 0, lat: 0 },
    dt: 0,
    id: 0,
    main: { feels_like: 0, humidity: 0, pressure: 0, sea_level: 0, temp: 0, temp_max: 0, temp_min: 0 },
    name: '',
    sys: { type: 0, id: 0, country: '', sunrise: 0, sunset: 0 },
    timezone: 0,
    visibility: 0,
    weather: [ { id: 0, main: '', description: '', icon: '' } ],
    wind: { speed: 0, deg: 0 }
  },
  contaminacion: {
    coord: {lon: 0, lat: 0},
    list: [
        {
            main: { aqi: 0 },
            dt: 0,
            componentes: {
                co: 0,
                nh3: 0,
                no: 0,
                no2: 0,
                o3: 0,
                pm2_5: 0,
                pm10: 0,
                so2: 0
            }
        }
    ]
}
}

export interface PronosticoProps {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: { temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number };
  pop: number;
  sys: { pod: string };
  visibility: number;
  weather: { description: string, icon: string, id: number, main: string }[];
  wind: { speed: number, deg: number, gust: number }
}

export const estadoInicialDePronosticoProps = {
  clouds: { all: 0 },
  dt: 0,
  dt_txt: '',
  main: { temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, pressure: 0 },
  pop: 0,
  sys: { pod: '' },
  visibility: 0,
  weather: [{ description: '', icon: '', id: 0, main: '' }],
  wind: { speed: 0, deg: 0, gust: 0 }
}