import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { PronosticoProps } from "../interfacez&types/weather";

interface Props {
  pronosticoDeCincoDias: { 
    [key: string]: PronosticoProps[]
  };
  datosDeLaGrafica: PronosticoProps[];
}

const initialState: Props = { 
  pronosticoDeCincoDias: {}, 
  datosDeLaGrafica: []
};

export const pronosticoSlice = createSlice({
  name: 'pronostico',
  initialState,
  reducers: {
    setPronostico: (state, action: PayloadAction<{ [key: string]: PronosticoProps[]}>) => {
      console.log('pronostico: ', action.payload)
      state.pronosticoDeCincoDias = action.payload;
    },
    setDatosParaGrafica: (state, action: PayloadAction<PronosticoProps[]>) => {
      state.datosDeLaGrafica = action.payload;
    }
  }
});

export const { setPronostico, setDatosParaGrafica } = pronosticoSlice.actions;
export const pronosticoParaCincoDias = (state: RootState) => state.pronostico.pronosticoDeCincoDias;
export const datosDeLaGrafica = (state: RootState) => state.pronostico.datosDeLaGrafica;