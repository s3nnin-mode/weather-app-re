import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface PropsUnidad {
    unidad: string
}

const initialState: PropsUnidad = { unidad: 'celcius' }

export const unidadDeMedidaSlice = createSlice({
    name: 'unidad de medida',
    initialState,
    reducers: {
        setUnidad: (state, action: PayloadAction<string>) => {
            state.unidad = action.payload;
        }
    }
})

export const { setUnidad } = unidadDeMedidaSlice.actions;
export const unidadActual = (state: RootState) => state.unidadDeMedida.unidad;