import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UbicacionProps, WeatherProps, InitialStateWeather } from "../interfacez&types/weather";

interface PropsWeather {
  ubicacion: UbicacionProps,
  climaActual: WeatherProps
}

const initialState: PropsWeather = InitialStateWeather;

export const weatherSlice = createSlice({
  name: 'clima',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherProps>) => {
      state.climaActual = action.payload;
    },
    setUbicacion: (state, action: PayloadAction<UbicacionProps>) => {
      state.ubicacion = action.payload;
    }
  }
});

export const { setWeather, setUbicacion } = weatherSlice.actions;
export const weatherData = (state: RootState) => state.weather.climaActual;
export const ubicacionData = (state: RootState) => state.weather.ubicacion;