import { configureStore } from "@reduxjs/toolkit";
import { weatherSlice } from "./weather";
import { pronosticoSlice } from "./pronostico";
import { unidadDeMedidaSlice } from "./unidadParaGrados";

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
    pronostico: pronosticoSlice.reducer,
    unidadDeMedida: unidadDeMedidaSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;