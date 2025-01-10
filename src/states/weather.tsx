import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { UbicacionProps, WeatherProps, InitialStateWeather } from "../interfacez&types/weather";
import { PropsContaminacion } from "../interfacez&types/contaminacion";

interface PropsWeather {
  ubicacion: UbicacionProps,
  climaActual: WeatherProps,
  contaminacion: PropsContaminacion
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
    },
    setContaminacion: (state, action: PayloadAction<PropsContaminacion>) => {
      state.contaminacion = action.payload;
    }
  }
});

export const { setWeather, setUbicacion, setContaminacion } = weatherSlice.actions;
export const weatherData = (state: RootState) => state.weather.climaActual;
export const ubicacionData = (state: RootState) => state.weather.ubicacion;
export const contaminacionData = (state: RootState) => state.weather.contaminacion;